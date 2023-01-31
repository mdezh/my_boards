class Relation < ApplicationRecord
  belongs_to :user
  belongs_to :board

  validates :role, presence: true
  validates :board_id, uniqueness: { scope: :user_id }

  after_destroy ->(record) { destroy_board_if_owner record }
  after_create_commit ->(relation) { join_board relation }

  enum role: %i[owner subscriber]

  private

  def destroy_board_if_owner(record)
    return unless record.owner?

    # use this manual deleting instead of record.board.destroy for performance
    # TODO: put this into an async job
    Note.where(board: record.board).delete_all # without broadcasting, as we will destroy the board anyway
    Relation.where(board: record.board).delete_all
    record.board.destroy # use destroy instead of delete here as we need broadcasting
  end

  def join_board(relation)
    return unless relation.subscriber?

    # use sync broadcasting since it is unlikely that there are many clients with the same user
    broadcast_prepend_to relation.user, target: 'boards', partial: 'boards/board',
                                        locals: { board: relation.board }
    broadcast_remove_to relation.user, target: 'join_board'
    return unless relation.board.public_rw?

    broadcast_replace_to relation.user, target: 'add_note', partial: 'notes/add_form',
                                        locals: { board: relation.board }
  end
end
