class RoomsController < ApplicationController
  before_action :set_room, only: %i[edit update]

  def index
    @rooms = Room.all
  end

  def update
    if @room.update(room_params)
      flash[:success] = 'Room changed'
      redirect_to root_path
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  private

  def set_room
    @room = Room.find_by(id: params[:id])
    redirect_to root_path unless @room
  end

  def room_params
    params.require(:room).permit(:name, :description)
  end
end
