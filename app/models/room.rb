class Room < ApplicationRecord
  has_many :posts, dependent: :destroy
  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }

  before_validation :prepare_fields

  private

  def prepare_fields
    # with name.strip! form field after invalid submit will stay unstripped
    self.name = name.strip
    self.description = description.strip
  end
end
