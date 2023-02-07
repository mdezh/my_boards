class ApplicationController < ActionController::Base
  include Authentication
  include Authorization
  include CurrentUser
  include TimeZone
  include Formats
end
