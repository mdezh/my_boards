class MainController < ApplicationController
  def show
    @active_board_id = params[:board]
  end
end
