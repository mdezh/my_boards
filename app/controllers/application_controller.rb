class ApplicationController < ActionController::Base
  include Authorization

  # looks like it works without next line
  # protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :set_current_user
  around_action :set_time_zone

  private

  def set_current_user
    Current.skip_user_check = false
    Current.user = current_user
  end

  def set_time_zone(&block)
    time_zone = request.headers['X-Time-Zone'] || 'UTC'
    Time.use_zone(time_zone, &block)
  end
end
