class NotesController < ApplicationController
  before_action :set_board_id, only: %i[index create]

  NOTES_PER_FIRST_PAGE = 30
  NOTES_PER_NEXT_PAGE = 10
  TRIGGER_FROM_EDGE = 5

  def index
    if request.headers.to_h['HTTP_TURBO_FRAME'].blank? &&
       request.headers.to_h['HTTP_ACCEPT'] != 'text/vnd.turbo-stream.html'
      redirect_to root_path(board: @board_id)
      return
    end

    if @board_id.zero?
      @notes = nil
      return
    end

    @cursor = params[:cursor]&.to_i || (Note.last&.id || 0) + 1
    amount = params[:cursor] ? NOTES_PER_NEXT_PAGE : NOTES_PER_FIRST_PAGE
    @notes = Note.order(id: :desc).where('board_id = ? and id < ?', @board_id, @cursor).take(amount).reverse
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

  def create
    board = Board.find(@board_id)
    @note = board.notes.build(note_params)
    @note.save!
    respond_to do |f|
      f.turbo_stream do
        render turbo_stream: turbo_stream.append('note_list', partial: 'note',
                                                              locals: { note: @note, auto_scroll: true })
      end
    end
  end

  private

  def set_board_id
    @board_id = (params[:board_id] || params[:board] || '0').to_i
  end

  def note_params
    params.require(:note).permit(:content)
  end
end
