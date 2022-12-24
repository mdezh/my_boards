class Room < ApplicationRecord
  has_many :posts, dependent: :destroy
  validates :name, presence: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
end
