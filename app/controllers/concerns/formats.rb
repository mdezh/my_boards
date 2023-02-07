module Formats
  extend ActiveSupport::Concern

  private

  def turbo_frame_only
    return if helpers.turbo_frame?

    redirect_to root_path
  end

  def turbo_stream_only
    return if helpers.turbo_stream?

    redirect_to root_path
  end

  def turbo_only
    return if helpers.turbo?

    redirect_to root_path
  end
end
