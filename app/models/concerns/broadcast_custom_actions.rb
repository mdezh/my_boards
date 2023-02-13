module BroadcastCustomActions
  extend ActiveSupport::Concern

  included do
    include Turbo::Streams::ActionHelper
    include Turbo::Streams::StreamName
  end

  def broadcast_custom_action_to(*streamables, action:, **attributes)
    broadcast_custom_actions_to(*streamables, actions: { action => attributes })
  end

  def broadcast_custom_actions_to(*streamables, actions:)
    content = actions.map do |action, attributes|
      encoded = attributes.transform_values do |v|
        v.is_a?(Hash) || v.is_a?(Array) ? ActiveSupport::JSON.encode(v) : v
      end
      turbo_stream_action_tag(action, **encoded)
    end.join
    ActionCable.server.broadcast(stream_name_from(streamables), content)
  end
end
