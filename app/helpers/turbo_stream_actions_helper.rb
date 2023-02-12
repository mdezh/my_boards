module TurboStreamActionsHelper
  def event(details:)
    turbo_stream_action_tag :event, details: ActiveSupport::JSON.encode(details)
  end
end

Turbo::Streams::TagBuilder.prepend(TurboStreamActionsHelper)
