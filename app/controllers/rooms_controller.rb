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
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.append('new_room_wrapper', partial: 'form')
        ]
      end
      format.html
    end
  end

  def cancel
    render 'shared/_empty_frame', locals: { id: 'new_room' }
  end

  def create
    @room = Room.new(room_params)
    respond_to do |format|
      if @room.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.remove('no_rooms'),
            turbo_stream.remove('new_room'),
            turbo_stream.prepend('room_list', partial: 'room', locals: { room: @room })
          ]
        end
        format.html { redirect_to root_path }
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            'new_room',
            partial: 'form',
            status: :unprocessable_entity
          )
        end
        format.html { render 'new', status: :unprocessable_entity }
      end
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
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(helpers.dom_id(@room, :list_item))
        ] + (Room.count.zero? ? [turbo_stream.prepend('room_list', partial: 'no_rooms')] : [])
      end
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
