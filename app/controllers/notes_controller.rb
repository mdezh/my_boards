class NotesController < ApplicationController
  before_action :turbo_only, only: %i[index]
  before_action :turbo_frame_only, only: %i[show edit]
  before_action :set_board!, only: %i[index create]
  before_action :set_note!, only: %i[destroy edit update show]
  before_action :authorize_note!, only: %i[destroy edit update show]
  before_action :authorize_board!, only: %i[index create]
  after_action :verify_authorized

  def index
    @notes = [] and return unless @board

    cursor = params[:cursor]&.to_i

    scroller = InfiniteScrollService.new(trigger_shift: -2, order: :desc)
    @notes, @next_cursor, @loading_trigger = scroller.page_from(
      @board.notes.includes(:user),
      cursor
    )
    return unless cursor

    render turbo_stream: turbo_stream.before('notes_spinner', partial: 'note', collection: @notes)
  end

  def create
    @note = @board.notes.build(note_params)
    respond_to do |f|
      f.turbo_stream do
        if @note.save
          render turbo_stream: [
            # despite we use broadcasting we still need next line since we want autoscroll new note into the viewport
            turbo_stream.prepend('notes', partial: 'note', locals: { note: @note, auto_scroll: true }),
            turbo_stream.replace('add_note', partial: 'add_form',
                                             locals: { board: @board, owned: @owned, joined: @joined })
          ]
        else
          head :ok
        end
      end
    end
  end

  def destroy
    @note.destroy
    head :ok
  end

  def update
    if @note.update(note_params)
      render turbo_stream: turbo_stream.replace(
        helpers.dom_id(@note),
        partial: 'notes/note',
        locals: { note: @note, user_id: current_user.id }
      )
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  private

  def set_board!
    board_id = (params[:board_id] || params[:board] || '0').to_i
    @board = board_id.zero? ? nil : Board.find(board_id)
    return unless @board

    @owned = @board.owned_by_user?(current_user)
    @joined = @board.joined_by_user?(current_user)
  end

  def set_note!
    @note = Note.find(params[:id])
  end

  def authorize_note!
    authorize @note || Note
  end

  def authorize_board!
    authorize @board, policy_class: NotePolicy
  end

  def note_params
    params.require(:note).permit(:content)
  end
end
