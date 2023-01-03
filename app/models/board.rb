class Board < ApplicationRecord
  has_many :notes, dependent: :destroy
  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }

  before_validation :strip_fields

  broadcasts_to ->(_board) { 'boards' }, inserts_by: :prepend

  private

  def strip_fields
    # with name.strip! form field after invalid submit will stay unstripped
    self.name = name.strip
    self.description = description.strip
  end
end
