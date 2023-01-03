class Board < ApplicationRecord
  include ActionView::RecordIdentifier  # for dom_id

  has_many :notes, dependent: :destroy
  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }

  before_validation :strip_fields

  after_create_commit -> { broadcast_prepend_later_to 'boards', target: 'board_list' }
  after_update_commit -> { broadcast_replace_later_to 'boards', target: dom_id(self, :list_item) }
  after_destroy_commit -> { broadcast_remove_to 'boards', target: dom_id(self, :list_item) }

  private

  def strip_fields
    # with name.strip! form field after invalid submit will stay unstripped
    self.name = name.strip
    self.description = description.strip
  end
end
