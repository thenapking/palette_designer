# app/controllers/palettes_controller.rb
class PalettesController < ApplicationController
  before_action :set_palette, only: [:show, :edit, :update, :destroy, :move]

  def index
    @palettes = Palette.all.includes(:colour_stops)
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @palette.to_json_palette }
    end
  end

  def new
    @palette = Palette.new
    @palette.colour_stops.build(position: 0, position_percent: 0, colour_hex: "#FF0000")
    @palette.colour_stops.build(position: 1, position_percent: 1, colour_hex: "#0000FF")
  end

  def create
    @palette = Palette.new(palette_params)
    
    if @palette.save
      redirect_to @palette, notice: 'Palette was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @palette.update(palette_params)
      redirect_to @palette, notice: 'Palette was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @palette.destroy
    redirect_to palettes_path, notice: 'Palette was successfully deleted.'
  end
  
  def move
    direction = params[:direction]
    stop_id = params[:stop_id]
    
    @palette.move(stop_id, direction)
    
    redirect_to edit_palette_path(@palette)
  end

  private
  
  def set_palette
    @palette = Palette.find(params[:id])
  end

  def palette_params
    params.require(:palette).permit(
      :name,
      colour_stops_attributes: [:id, :position_percent, :colour_hex, :_destroy]
    )
  end
end
