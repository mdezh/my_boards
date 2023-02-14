module BoardPresenter
  def sharing_status_humanized
    BoardService.humanize_sharing_status(sharing_status)
  end

  def created_at_formatted
    DatetimeService.format_datetime(created_at)
  end
end
