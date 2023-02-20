class Note < ApplicationRecord
  include Presenter

  belongs_to :board
  belongs_to :user, default: -> { Current.user }
  validates :content, presence: true

  before_validation :strip_content

  after_create_commit ->(note) { add_note note }
  after_update_commit ->(note) { update_note note }
  after_destroy_commit ->(note) { destroy_note note }

  private

  def strip_content
    # with content.strip! form field after invalid submit will stay unstripped
    self.content = content.strip
  end

  def add_note(note)
    broadcast_prepend_later_to [note.board, :notes]
    broadcast_update_later_to [note.board, :notes], target: nil, targets: '.bc-board-notes-count',
                                                    html: note.board.notes.count
  end

  def update_note(note)
    broadcast_replace_later_to [note.board, :notes], target: ActionView::RecordIdentifier.dom_id(note, :inner_show),
                                                     partial: 'notes/note_inner_show', locals: { note:, user_id: 0 }
  end

  def destroy_note(note)
    broadcast_remove_to [note.board, :notes]
    broadcast_update_to [note.board, :notes], target: nil, targets: '.bc-board-notes-count',
                                              html: note.board.notes.count
  end
end
