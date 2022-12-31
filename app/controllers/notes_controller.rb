class NotesController < ApplicationController
  def index
    board_id = params[:board]
    @notes = board_id.nil? ? nil : Note.order(id: :desc).where(board_id:)
  end
end
