class RoomsController < ApplicationController
  before_action :set_room, only: %i[show edit update destroy details]

  def index
    @rooms = Room.order(created_at: :desc)
  end

  def show
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(
            helpers.dom_id(@room),
            partial: 'room_inside',
            locals: { room: @room }
          ),
          turbo_stream.replace('add_room_btn', partial: 'add_room_btn')
        ]
      end
      format.html { redirect_to root_path }
    end
  end

  def new
    @room = Room.new
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace('add_room_btn', partial: 'add_room_btn', locals: { disabled: true }),
          turbo_stream.before('room_list', partial: 'form')
        ]
      end
      format.html { render 'new' }
    end
  end

  def cancel
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove('new_room'),
          turbo_stream.replace(
            'add_room_btn',
            partial: 'add_room_btn',
            locals: { disabled: false }
          )
        ]
      end
      format.html { redirect_to root_path }
    end
  end

  def create
    @room = Room.new(room_params)
    respond_to do |format|
      if @room.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.remove('new_room'),
            turbo_stream.prepend('room_list', @room),
            turbo_stream.replace(
              'add_room_btn',
              partial: 'add_room_btn',
              locals: { disabled: false }
            )
          ]
        end
        format.html { redirect_to root_path }
      else
        format.turbo_stream do
          render turbo_stream: turbo_stream.update(
            'new_room',
            partial: 'form',
            status: :unprocessable_entity
          )
        end
        format.html { render 'new', status: :unprocessable_entity }
      end
    end
  end

  def edit
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(helpers.dom_id(@room), partial: 'form'),
          turbo_stream.replace('add_room_btn', partial: 'add_room_btn', locals: { disabled: true })
        ]
      end
      format.html { render 'edit' }
    end
  end

  def update
    if @room.update(room_params)
      show
    else
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.replace(helpers.dom_id(@room), partial: 'form', status: :unprocessable_entity)
          ]
        end
        format.html { render 'edit', status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @room.destroy
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
