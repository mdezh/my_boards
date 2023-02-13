module BoardPresenter
  def sharing_status_humanized
    case sharing_status
    when 'forbidden'
      'private'
    when 'public_ro'
      'public, read only'
    when 'public_rw'
      'public, read and write'
    else
      'wrong value'
    end
  end
end
