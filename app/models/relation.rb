class Relation < ApplicationRecord
  belongs_to :user
  belongs_to :board

  validates :role, presence: true
  validates :board_id, uniqueness: { scope: :user_id }
  validate :board_name_should_be_unique_per_user

  enum role: %i[owner subscriber]

  private

  def board_name_should_be_unique_per_user
    board_name = board.name
    return unless user.boards.where('name = ?', board_name).count > 0

    errors.add(:name, 'should be unique per user')
  end
end
