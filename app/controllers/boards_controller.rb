class BoardsController < ApplicationController
  before_action :set_board!, only: %i[show edit update destroy details join leave]
  before_action :authorize_board!
  after_action :verify_authorized

  BOARDS_PER_FIRST_PAGE = 30
  BOARDS_PER_NEXT_PAGE = 10
  TRIGGER_FROM_BOTTOM = 3

  def index
    @active_board_id = params[:board]
    @cursor = params[:cursor]&.to_i || (Board.last&.id || 0) + 1
    amount = params[:cursor] ? BOARDS_PER_NEXT_PAGE : BOARDS_PER_FIRST_PAGE
    @boards = policy_scope(Board).where('board_id < ?',
                                        @cursor).select('boards.*, relations.id as position').order(position: :desc).includes(:owner).take(amount)
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
    @board = current_user.boards.create(board_params)
    respond_to do |f|
      f.turbo_stream do
        if @board.errors.empty?
          render turbo_stream: [
            # despite we use broadcasting we still need next line since we want autoscroll new board into the viewport
            turbo_stream.prepend('boards', partial: 'board', locals: { board: @board, auto_scroll: true }),
            turbo_stream.replace('add_board_frame', partial: 'add_board_btn'),
            turbo_stream.replace('set_state', partial: 'shared/set_state', locals: {
                                   state_id: 'panel_state',
                                   value: { active_panel: 'notes' }
                                 }),
            turbo_stream.replace('set_state', partial: 'shared/set_state', locals: {
                                   state_id: 'active_board_state',
                                   value: {
                                     id: @board.id,
                                     path: root_path(board: @board.id)
                                   }
                                 })
          ]
        else
          render turbo_stream: [
            turbo_stream.replace('add_board_frame', partial: 'form', status: :unprocessable_entity)
          ]
        end
      end
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

  def join
    relation = current_user.relations.build(board: @board, role: Relation.roles[:subscriber])
    if relation.save
      relation.broadcast_render_later_to [current_user, @board], partial: 'boards/on_join_user_board',
                                                                 locals: { board: @board }
      relation.broadcast_render_later_to current_user, partial: 'boards/on_join_user',
                                                       locals: { board: @board }
    else
      head :unprocessable_entity
    end
  end

  def leave
    Relation.where(user_id: current_user.id, board_id: @board.id).subscriber.destroy_all
    @board.broadcast_render_later_to current_user, partial: 'boards/on_leave_user',
                                                   locals: { board: @board }
    @board.broadcast_render_later_to [current_user, @board], partial: 'boards/on_leave_user_board',
                                                             locals: { board: @board }
  end

  private

  def set_board!
    @board = Board.find(params[:id])
  end

  def authorize_board!
    authorize(@board || Board)
  end

  def board_params
    params.require(:board).permit(:name, :description)
  end
end
