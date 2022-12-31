class BoardsController < ApplicationController
  before_action :set_board, only: %i[show edit update destroy details]

  BOARDS_PER_FIRST_PAGE = 30
  BOARDS_PER_NEXT_PAGE = 10
  TRIGGER_FROM_BOTTOM = 5

  def index
    @active_board_id = params[:board]
    @cursor = params[:cursor]&.to_i || (Board.last&.id || 0) + 1
    amount = params[:cursor] ? BOARDS_PER_NEXT_PAGE : BOARDS_PER_FIRST_PAGE
    @boards = Board.order(id: :desc).where('id < ?', @cursor).take(amount)
    @next_cursor = @boards.last&.id
    @loading_trigger = if @boards.empty?
                         nil
                       else
                         @boards.count < TRIGGER_FROM_BOTTOM ? @boards.first.id : @boards[-TRIGGER_FROM_BOTTOM].id
                       end
    @more_pages = @next_cursor.present? && @boards.count == amount
    return unless params[:cursor]

    render turbo_stream: turbo_stream.after(
      helpers.dom_id(Board.new(id: @cursor), :list_item), partial: 'board', collection: @boards
    )
  end

  def show
    if request.headers.to_h['HTTP_TURBO_FRAME'].present?
      render @board
    else
      redirect_to root_path
    end
  end

  def new
    @board = Board.new
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.before('board_list', partial: 'form')
      end
    end
  end

  def create
    @board = Board.new(board_params)
    respond_to do |format|
      if @board.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.remove('no_boards'),
            turbo_stream.remove('new_board'),
            turbo_stream.replace('add_board_btn', partial: 'add_board_btn'),    # reenable button
            turbo_stream.prepend('board_list', partial: 'board', locals: { board: @board })
          ]
        end
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            'new_board',
            partial: 'form',
            status: :unprocessable_entity
          )
        end
      end
    end
  end

  def update
    if @board.update(board_params)
      render @board
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  def destroy
    @board.destroy
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(helpers.dom_id(@board, :list_item))
        ] + (Board.count.zero? ? [turbo_stream.prepend('board_list', partial: 'no_boards')] : [])
      end
    end
  end

  private

  def set_board
    @board = Board.find_by(id: params[:id])
  end

  def board_params
    params.require(:board).permit(:name, :description)
  end
end
