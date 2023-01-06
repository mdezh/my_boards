class NotesController < ApplicationController
  before_action :set_board, only: %i[index create]
  before_action :set_note, only: %i[destroy edit update show]

  NOTES_PER_FIRST_PAGE = 30
  NOTES_PER_NEXT_PAGE = 10
  TRIGGER_FROM_EDGE = 1

  def index
    if request.headers.to_h['HTTP_TURBO_FRAME'].blank? &&
       request.headers.to_h['HTTP_ACCEPT'] != 'text/vnd.turbo-stream.html'
      redirect_to root_path(board: @board&.id || 0)
      return
    end

    if @board.nil?
      @notes = []
      return
    end

    @cursor = params[:cursor]&.to_i || (Note.last&.id || 0) + 1
    amount = params[:cursor] ? NOTES_PER_NEXT_PAGE : NOTES_PER_FIRST_PAGE
    @notes = @board.notes.order(id: :desc).where('id < ?', @cursor).take(amount)
    @next_cursor = @notes.last&.id
    @loading_trigger = if @notes.empty?
                         nil
                       else
                         @notes.count < TRIGGER_FROM_EDGE ? @notes.last.id : @notes[-TRIGGER_FROM_EDGE].id
                       end
    @more_pages = @next_cursor.present? && @notes.count == amount
    return unless params[:cursor]

    render turbo_stream: turbo_stream.after(
      Note.new(id: @cursor), partial: 'note', collection: @notes
    )
  end

  def create
    @note = @board.notes.build(note_params)
    respond_to do |f|
      f.turbo_stream do
        if @note.save
          render turbo_stream: [
            # next line is unnecessary since we use broadcasting
            # turbo_stream.prepend('notes', partial: 'note', locals: { note: @note, auto_scroll: true }),
            turbo_stream.replace('add_note', partial: 'add_form')
          ]
        else
          render turbo_stream: []
        end
      end
    end
  end

  def destroy
    respond_to do |f|
      f.turbo_stream do
        if @note.destroy
          # next line is unnecessary since we use broadcasting
          # render turbo_stream: turbo_stream.remove(@note)
          render turbo_stream: []
        else
          render turbo_stream: []
        end
      end
    end
  end

  def update
    if @note.update(note_params)
      # next line is unnecessary since we use broadcasting
      # render @note
      render html: ''
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  private

  def set_board
    board_id = (params[:board_id] || params[:board] || '0').to_i
    @board = board_id.zero? ? nil : Board.find(board_id)
  end

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:content)
  end
end
