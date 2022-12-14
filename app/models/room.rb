class Room < ApplicationRecord
  has_many :posts, dependent: :destroy
end
