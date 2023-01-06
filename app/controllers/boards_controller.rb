class BoardsController < ApplicationController
  before_action :set_board, only: %i[show edit update destroy details]

  BOARDS_PER_FIRST_PAGE = 30
  BOARDS_PER_NEXT_PAGE = 10
  TRIGGER_FROM_BOTTOM = 3

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
      Board.new(id: @cursor), partial: 'board', collection: @boards
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
        render turbo_stream: turbo_stream.before('boards', partial: 'form')
      end
    end
  end

  def create
    @board = Board.new(board_params)
    respond_to do |format|
      if @board.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.remove('inner_board'),
            turbo_stream.replace('add_board_btn', partial: 'add_board_btn') # reenable button
            # next line is unnecessary since we use broadcasting
            # turbo_stream.prepend('boards', partial: 'board', locals: { board: @board })
          ]
        end
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            'inner_board',
            partial: 'form',
            status: :unprocessable_entity
          )
        end
      end
    end
  end

  def update
    if @board.update(board_params)
      # next line is unnecessary since we use broadcasting
      # render @board
      render html: ''
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  def destroy
    respond_to do |format|
      format.turbo_stream do
        if @board.destroy
          # next line is unnecessary since we use broadcasting
          # render turbo_stream: turbo_stream.remove(@board)
          render turbo_stream: []
        else
          render turbo_stream: []
        end
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
