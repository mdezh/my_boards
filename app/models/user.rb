class User < ApplicationRecord
  # Include default devise modules. Others available are: :recoverable,
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  has_many :relations, dependent: :destroy
  has_many :boards, through: :relations
  has_many :notes, dependent: :destroy

  validates_presence_of :nickname
  validates_length_of :nickname, within: 1..20
  validates_format_of :nickname, with: /\A[a-z][a-z0-9_]*\z/i
  validates_uniqueness_of :nickname

  # next two lines prevent email validation by devise (as we removed this field)
  def email_required? = false
  def will_save_change_to_email? = false
end
