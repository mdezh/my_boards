module Authentication
  extend ActiveSupport::Concern

  included do
    # looks like it works without next line
    # protect_from_forgery with: :exception
    before_action :authenticate_user!
  end
end
