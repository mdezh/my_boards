class Relation < ApplicationRecord
  belongs_to :user
  belongs_to :board

  validates :role, presence: true
  validates :board_id, uniqueness: { scope: :user_id }
  validate :board_name_should_be_unique_per_user, on: :create

  after_destroy ->(record) { destroy_board_if_owner record }

  enum role: %i[owner subscriber]

  private

  def board_name_should_be_unique_per_user
    return unless user.boards.where('name = ?', board.name).count.positive?

    errors.add(:name, 'should be unique per user')
  end

  def destroy_board_if_owner(record)
    return unless record.owner?

    # use this manual deleting instead of record.board.destroy for performance
    # TODO: put this into an async job
    Note.where(board: record.board).delete_all # without broadcasting, as we will destroy the board anyway
    Relation.where(board: record.board).delete_all
    record.board.destroy  # use destroy instead of delete here as we need broadcasting
  end
end
