module Formats
  extend ActiveSupport::Concern

  private

  def turbo_frame_only
    return if turbo_frame?

    redirect_to root_path
  end

  def turbo_stream_only
    return if turbo_stream?

    redirect_to root_path
  end

  def turbo_only
    return if turbo?

    redirect_to root_path
  end

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
