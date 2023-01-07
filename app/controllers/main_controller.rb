class MainController < ApplicationController
  def show
    @active_board_id = params[:board] || '0'
    if @active_board_id != '0' && !Board.find_by(id: @active_board_id)
      redirect_to root_path
      return
    end
    return if request.headers.to_h['HTTP_TURBO_FRAME'].nil?

    NotesController.dispatch(:index, request, response)
  end
end
