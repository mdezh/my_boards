module Presenter
  extend ActiveSupport::Concern

  included do |base|
    include "#{base}Presenter".constantize
  end
end
