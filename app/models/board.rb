class Board < ApplicationRecord
  has_many :notes, dependent: :destroy
  has_many :relations, dependent: :destroy
  has_many :users, through: :relations

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }

  before_validation :prepare_fields

  broadcasts_to ->(_board) { 'boards' }, inserts_by: :prepend

  def belong_to_user?(user)
    users.include?(user)
  end

  private

  def prepare_fields
    # with name.squish! form field after invalid submit will stay unsquished
    self.name = name.squish
    self.description = description.strip
  end
end
