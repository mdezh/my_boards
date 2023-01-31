class Note < ApplicationRecord
  include Presenter

  belongs_to :board
  belongs_to :user, default: -> { Current.user }
  validates :content, presence: true

  before_validation :strip_content

  broadcasts_to ->(note) { [note.board, :notes] }, inserts_by: :prepend

  def visible_to_user?(user)
    Relation.where(board_id:).where(user_id: user.id).present? || board.published?
  end

  def updatable_for_user?(user)
    user_id == user.id
  end

  def destroyable_for_user?(user)
    updatable_for_user?(user) || Relation.owner.where(board_id:).where(user_id: user.id).present?
  end

  private

  def strip_content
    # with content.strip! form field after invalid submit will stay unstripped
    self.content = content.strip
  end
end
