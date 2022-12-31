class NotesController < ApplicationController
  NOTES_PER_FIRST_PAGE = 30
  NOTES_PER_NEXT_PAGE = 10
  TRIGGER_FROM_EDGE = 5

  def index
    board_id = params[:board]

    if request.headers.to_h['HTTP_TURBO_FRAME'].blank? &&
       request.headers.to_h['HTTP_ACCEPT'] != 'text/vnd.turbo-stream.html'
      redirect_to root_path(board: board_id)
      return
    end

    if board_id.nil?
      @notes = nil
      return
    end

    @cursor = params[:cursor]&.to_i || (Note.last&.id || 0) + 1
    amount = params[:cursor] ? NOTES_PER_NEXT_PAGE : NOTES_PER_FIRST_PAGE
    @notes = Note.order(id: :desc).where('board_id = ? and id < ?', board_id, @cursor).take(amount).reverse
    @next_cursor = @notes.first&.id
    @loading_trigger = if @notes.empty?
                         nil
                       else
                         @notes.count < TRIGGER_FROM_EDGE ? @notes.first.id : @notes[TRIGGER_FROM_EDGE].id
                       end
    @more_pages = @next_cursor.present? && @notes.count == amount
    return unless params[:cursor]

    render turbo_stream: turbo_stream.before(
      helpers.dom_id(Note.new(id: @cursor), :note_list_item), partial: 'note', collection: @notes
    )
  end
end
