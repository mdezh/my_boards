module TurboStreamActionsHelper
  def event(name:, detail:)
    turbo_stream_action_tag :event, name:, detail:
  end
end

Turbo::Streams::TagBuilder.prepend(TurboStreamActionsHelper)
