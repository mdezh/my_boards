class RoomsController < ApplicationController
  before_action :set_room, only: %i[edit update destroy details]

  def index
    @rooms = Room.all
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      flash[:notice] = 'New room created'
      redirect_to root_path
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def update
    if @room.update(room_params)
      flash[:notice] = 'Room changed'
      redirect_to root_path
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  def destroy
    @room.destroy
    flash[:notice] = 'Room deleted'
    redirect_to root_path, status: :see_other
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
