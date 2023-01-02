class Note < ApplicationRecord
  belongs_to :board
  validates :content, presence: true

  before_validation :strip_content

  private

  def strip_content
    content.strip!
  end
end
