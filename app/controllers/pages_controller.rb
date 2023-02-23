class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[about]

  def home
    @active_board_id = params[:board] || '0'
    if @active_board_id != '0'
      board = Board.find_by(id: @active_board_id)
      if board.nil? || (!board.belong_to_user?(current_user) && !board.published?)
        redirect_to root_path
        return
      end
    end
    return unless turbo_frame?

    NotesController.dispatch(:index, request, response)
  end

  def about; end
end
