module NotePresenter
  def time_mark
    (created_at == updated_at ? '' : 'Updated at ') << time_formatted
  end

  def time_formatted
    DatetimeService.format_datetime(updated_at)
  end
end
