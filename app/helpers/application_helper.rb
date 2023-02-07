module ApplicationHelper
  def turbo_frame?
    request.headers['HTTP_TURBO_FRAME'].present?
  end

  def turbo_stream?
    formats.include?(:turbo_stream)
  end

  def turbo?
    turbo_frame? || turbo_stream?
  end
end
