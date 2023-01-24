class Board < ApplicationRecord
  has_many :notes, dependent: :destroy
  has_many :relations, dependent: :destroy
  has_many :users, through: :relations

  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validate :name_should_be_unique_per_user, on: :update

  before_validation :prepare_fields

  after_create_commit ->(board) { add_board board }
  after_update_commit ->(board) { update_board board }
  after_destroy_commit ->(board) { destroy_board board }

  def belong_to_user?(user)
    users.include?(user)
  end

  def owned_by_user?(user)
    relations.owner&.first&.user == user
  end

  private

  def name_should_be_unique_per_user
    board_with_same_name = relations.owner.first.user.boards.find_by_name(name)
    return if board_with_same_name.nil?
    return if board_with_same_name.id == id

    errors.add(:name, 'should be unique per user')
  end

  def add_board(board)
    user = board.relations.find_by(role: :owner).user
    broadcast_prepend_later_to(user) unless user.nil?
  end

  def update_board(board)
    broadcast_replace_later_to(board)
  end

  def destroy_board(board)
    broadcast_remove_to(board)
  end

  def prepare_fields
    # with name.squish! form field after invalid submit will stay unsquished
    self.name = name.squish
    self.description = description.strip
  end
end
