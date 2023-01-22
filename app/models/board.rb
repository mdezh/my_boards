class Board < ApplicationRecord
  has_many :notes, dependent: :destroy
  has_many :relations, dependent: :destroy
  has_many :users, through: :relations

  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }

  before_validation :prepare_fields

  after_create_commit ->(board) { add_board board }
  after_update_commit ->(board) { update_board board }
  after_destroy_commit ->(board) { destroy_board board }

  def belong_to_user?(user)
    users.include?(user)
  end

  private

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
