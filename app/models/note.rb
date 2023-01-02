class Note < ApplicationRecord
  belongs_to :board
  validates :content, presence: true

  before_validation :strip_content

  private

  def strip_content
    # with content.strip! form field after invalid submit will stay unstripped
    self.content = content.strip
  end
end
