class Board < ApplicationRecord
  has_many :notes, dependent: :destroy
  has_many :relations, dependent: :destroy
  has_many :users, through: :relations

  enum sharing_status: %i[forbidden public_ro public_rw invite_ro invite_rw]

  scope :published, -> { Board.public_ro.or(Board.public_rw) }

  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validate :name_should_be_unique_per_user, on: %i[create update]

  before_validation :prepare_fields

  after_create_commit ->(board) { add_board board }
  after_update_commit ->(board) { update_board board }
  after_destroy_commit ->(board) { destroy_board board }

  def belong_to_user?(user)
    relations.where(user_id: user.id).present?
  end

  def owned_by_user?(user)
    relations.where(user_id: user.id).owner.present?
  end

  def published?
    sharing_status.in? %w[public_ro public_rw]
  end

  def writable_for_user?(user)
    owned_by_user?(user) || public_rw?
  end

  private

  def name_should_be_unique_per_user
    use_current_user = true

    if Current.user.nil?
      raise 'Current.user is necessary for board validation on create, but is is nil' unless relations.present?

      use_current_user = false
    end

    board_with_same_name = if use_current_user
                             Board.where(relations: Current.user.relations.owner).find_by_name(name)
                           else
                             relations.owner.first.user.boards.find_by_name(name)
                           end
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
