class Role < ApplicationRecord
  belongs_to :user
  belongs_to :board

  enum role: %i[owner subscriber]
end
