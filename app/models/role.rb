class Role < ApplicationRecord
  belongs_to :user
  belongs_to :board

  validates :role, presence: true

  enum role: %i[owner subscriber]
end
