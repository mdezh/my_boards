class User < ApplicationRecord
  # Include default devise modules. Others available are: :recoverable,
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  validates_presence_of :nickname
  validates_uniqueness_of :nickname

  # next two lines prevent email validation by devise (as we removed this field)
  def email_required? = false
  def will_save_change_to_email? = false
end
