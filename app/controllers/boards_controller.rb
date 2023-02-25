class BoardsController < ApplicationController
  before_action :turbo_only, only: %i[index]
  before_action :turbo_frame_only, only: %i[show new edit cancel_new]
  before_action :set_board!, only: %i[show edit update destroy details join leave]
  before_action :authorize_board!
  after_action :verify_authorized

  def index
    @active_board_id = params[:board]
    cursor = params[:cursor]&.to_i

    scroller = InfiniteScrollService.new(trigger_shift: -3, cursor_column: :position, order: :desc)
    @boards, @next_cursor, @loading_trigger = scroller.page_from(
      policy_scope(Board).select('boards.*, relations.id as position').includes(:owner),
      cursor
    )
    return unless cursor

    render turbo_stream: turbo_stream.before('boards_spinner', partial: 'board', collection: @boards)
  end

  def show
    render @board
  end

  def new
    @board = Board.new
  end

  def create
    @board = current_user.boards.create(board_params)
    return if @board.errors.empty?

    render turbo_stream: [
      turbo_stream.replace('add_board_frame', partial: 'form_new', status: :unprocessable_entity)
    ]
  end

  def cancel_new
    render partial: 'add_board_btn'
  end

  def update
    if @board.update(board_params)
      render 'details'
    else
      render partial: 'form_edit', status: :unprocessable_entity
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
      relation.broadcast_render_later_to current_user,
                                         partial: 'boards/on_join_user',
                                         locals: { board: @board, current_user_id: current_user.id }
      relation.broadcast_update_later_to [@board, :notes], target: nil, targets: '.bc-board-users-count',
                                                           html: @board.users.count
    else
      head :unprocessable_entity
    end
  end

  def leave
    Relation.where(user_id: current_user.id, board_id: @board.id).subscriber.delete_all
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
    params.require(:board).permit(:name, :description, :sharing_status)
  end
end
