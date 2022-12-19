class RoomsController < ApplicationController
  before_action :set_room, only: %i[show edit update destroy details]

  def index
    @rooms = Room.order(created_at: :desc)
  end

  def show
    if request.headers.to_h['HTTP_TURBO_FRAME']
      render @room
    else
      redirect_to root_path
    end
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      redirect_to root_path
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def update
    if @room.update(room_params)
      redirect_to root_path
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  def destroy
    @room.destroy
    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.remove(helpers.dom_id(@room, :list_item)) }
    end
    # redirect_to root_path, status: :see_other
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
