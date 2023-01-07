class ApplicationController < ActionController::Base
  before_action :set_utc_offset

  private

  def set_utc_offset
    @utc_offset = request.headers['X-UTC-Offset']&.to_i || 0
  end
end
