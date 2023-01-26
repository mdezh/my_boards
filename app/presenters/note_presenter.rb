module NotePresenter
  def time_mark
    (created_at == updated_at ? '' : 'Updated at ') << time_formatted
  end

  def time_formatted
    updated_at.to_fs(
      if Time.current - updated_at < 1.day && Time.current.day == updated_at.day
        :time
      elsif Time.current.year == updated_at.year
        :short
      else
        :long
      end
    )
  end
end
