class Note < ApplicationRecord
  belongs_to :board

  before_validation :strip_content

  private

  def strip_content
    content.strip!
  end
end
