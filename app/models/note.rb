class Note < ApplicationRecord
  include Presenter

  belongs_to :board
  belongs_to :user, default: -> { Current.user }
  validates :content, presence: true

  before_validation :strip_content

  broadcasts_to ->(note) { [note.board, :notes] }, inserts_by: :prepend

  private

  def strip_content
    # with content.strip! form field after invalid submit will stay unstripped
    self.content = content.strip
  end
end
