module TimeZone
  extend ActiveSupport::Concern

  included do
    around_action :set_time_zone

    private

    def set_time_zone(&block)
      time_zone = request.headers['X-Time-Zone'] || 'UTC'
      Time.use_zone(time_zone, &block)
    end
  end
end
