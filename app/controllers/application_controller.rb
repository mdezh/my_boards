class ApplicationController < ActionController::Base
  around_action :set_time_zone

  private

  def set_time_zone(&block)
    time_zone = request.headers['X-Time-Zone'] || 'UTC'
    Time.use_zone(time_zone, &block)
  end
end
