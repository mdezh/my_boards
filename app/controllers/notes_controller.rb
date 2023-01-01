class NotesController < ApplicationController
  before_action :set_board, only: %i[index create]

  NOTES_PER_FIRST_PAGE = 30
  NOTES_PER_NEXT_PAGE = 10
  TRIGGER_FROM_EDGE = 5

  def index
    if request.headers.to_h['HTTP_TURBO_FRAME'].blank? &&
       request.headers.to_h['HTTP_ACCEPT'] != 'text/vnd.turbo-stream.html'
      redirect_to root_path(board: @board&.id || 0)
      return
    end

    if @board.nil?
      @notes = nil
      return
    end

    @cursor = params[:cursor]&.to_i || (Note.last&.id || 0) + 1
    amount = params[:cursor] ? NOTES_PER_NEXT_PAGE : NOTES_PER_FIRST_PAGE
    @notes = @board.notes.order(id: :desc).where('id < ?', @cursor).take(amount).reverse
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
    @note = @board.notes.build(note_params)
    respond_to do |f|
      f.turbo_stream do
        if @note.save
          render turbo_stream: [
            turbo_stream.append('note_list', partial: 'note', locals: { note: @note, auto_scroll: true }),
            turbo_stream.replace('add_note', partial: 'add_form')
          ]
        else
          render turbo_stream: turbo_stream.replace('add_note', partial: 'add_form')
        end
      end
    end
  end

  private

  def set_board
    board_id = (params[:board_id] || params[:board] || '0').to_i
    @board = board_id.zero? ? nil : Board.find(board_id)
  end

  def note_params
    params.require(:note).permit(:content)
  end
end
