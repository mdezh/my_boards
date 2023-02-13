class DatetimeService
  def self.format_datetime(datetime)
    datetime.to_fs(
      if Time.current - datetime < 1.day && Time.current.day == datetime.day
        :time
      elsif Time.current.year == datetime.year
        :short
      else
        :long
      end
    )
  end
end
