module BoardPresenter
  def sharing_status_humanized
    SharingStatusService.humanize(sharing_status)
  end

  def created_at_formatted
    DatetimeService.format_datetime(created_at)
  end
end
