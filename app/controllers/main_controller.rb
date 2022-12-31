class MainController < ApplicationController
  def show
    @active_board_id = params[:board]
    return if request.headers.to_h['HTTP_TURBO_FRAME'].nil?

    NotesController.dispatch(:index, request, response)
  end
end
