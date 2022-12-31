class NotesController < ApplicationController
  def index
    board_id = params[:board]
    if request.headers.to_h['HTTP_TURBO_FRAME']
      @notes = board_id.nil? ? nil : Note.order(id: :desc).where(board_id:)
    else
      redirect_to root_path(board: board_id)
    end
  end
end
