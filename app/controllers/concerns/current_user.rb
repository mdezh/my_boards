module CurrentUser
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user

    private

    def set_current_user
      Current.skip_user_check = false
      Current.user = current_user
    end
  end
end
