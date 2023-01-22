class BoardsController < ApplicationController
  before_action :set_board, only: %i[show edit update destroy details]

  BOARDS_PER_FIRST_PAGE = 30
  BOARDS_PER_NEXT_PAGE = 10
  TRIGGER_FROM_BOTTOM = 3

  def index
    @active_board_id = params[:board]
    @cursor = params[:cursor]&.to_i || (Board.last&.id || 0) + 1
    amount = params[:cursor] ? BOARDS_PER_NEXT_PAGE : BOARDS_PER_FIRST_PAGE
    @boards = current_user.boards.order(id: :desc).where('board_id < ?', @cursor).take(amount)
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
  end

  def create
    # use rescue since the association calls create! (or save!) internally
    begin
      @board = current_user.boards.create(board_params)
    rescue ActiveRecord::RecordInvalid => e
      @board = Board.new(board_params)
      @board.valid?  # call before_validation callback
      e.record.errors.each do |error|
        @board.errors.add(error.attribute, error.type)
      end
    end
    if @board.errors.empty?
      render partial: 'add_board_btn'
    else
      render partial: 'form', status: :unprocessable_entity
    end
  end

  def cancel_new
    render partial: 'add_board_btn'
  end

  def update
    if @board.update(board_params)
      head :ok
    else
      render partial: 'form', status: :unprocessable_entity
    end
  end

  def destroy
    @board.destroy
    head :ok
  end

  private

  def set_board
    @board = Board.find_by(id: params[:id])
  end

  def board_params
    params.require(:board).permit(:name, :description)
  end
end
