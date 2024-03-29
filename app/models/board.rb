class Board < ApplicationRecord
  include Presenter
  include BroadcastCustomActions

  has_many :notes, dependent: :destroy
  has_many :relations, dependent: :destroy
  has_many :users, through: :relations
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id', default: -> { Current.user }

  enum sharing_status: %i[forbidden public_ro public_rw]

  scope :published, -> { Board.public_ro.or(Board.public_rw) }

  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validate :name_should_be_unique_per_user, on: %i[create update]

  before_validation :prepare_fields

  after_update ->(board) { board.relations.subscriber.delete_all if board.forbidden? }

  after_create_commit ->(board) { add_board board }
  after_update_commit ->(board) { update_board board }
  after_destroy_commit ->(board) { destroy_board board }

  def belong_to_user?(user)
    relations.where(user_id: user.id).present?
  end

  def owned_by_user?(user)
    owner_id == user.id
  end

  def joined_by_user?(user)
    relations.where(user_id: user.id).subscriber.present?
  end

  def published?
    sharing_status.in? %w[public_ro public_rw]
  end

  private

  def name_should_be_unique_per_user
    use_current_user = true

    if Current.user.nil?
      raise 'Current.user is necessary for board validation on create, but it is nil' unless relations.present?

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
    broadcast_prepend_later_to(board.owner)
  end

  def update_board(board)
    broadcast_replace_later_to board, target: ActionView::RecordIdentifier.dom_id(board, :inner),
                                      partial: 'boards/board_inner', locals: { board: }
    broadcast_update_later_to [board, :notes], target: nil, targets: '.bc-board-name', html: board.name
    broadcast_update_later_to [board, :notes], target: nil, targets: '.bc-board-description', html: board.description
    broadcast_update_later_to [board, :notes], target: nil, targets: '.bc-board-sharing-status',
                                               html: board.sharing_status_humanized
    broadcast_replace_later_to [board, :notes], target: 'set_state', partial: 'shared/set_state',
                                                locals: { value: { board_state: { public_rw: board.public_rw? } } }
    return unless board.forbidden?

    broadcast_remove_to [board, :joined]
    broadcast_render_later_to [board, :notes, :joined],
                              partial: 'boards/on_leave_user_board',
                              locals: { board: }
    broadcast_update_later_to [board, :notes], target: nil, targets: '.bc-board-users-count',
                                               html: board.users.count
  end

  def destroy_board(board)
    broadcast_custom_action_to [Current.user, board], action: :event, details: {
      set_panel_state: { active_panel: 'boards' },
      notes_loader: { id: 0, path: '/' }
    }
    broadcast_remove_to(board)
  end

  def prepare_fields
    # with name.squish! form field after invalid submit will stay unsquished
    self.name = name.squish
    self.description = description.strip
  end
end
