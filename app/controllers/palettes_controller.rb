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
    @palette.colour_stops.build(position: 0, percentage: 0, hex: "#FF0000")
    @palette.colour_stops.build(position: 1, percentage: 1, hex: "#0000FF")
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
    @palette = Palette.find(params[:id])

    if @palette.update(palette_params)
      respond_to do |format|
        # format.turbo_stream do
        #   puts 'turbo_stream'
        #   render turbo_stream: turbo_stream.replace(
        #     "preview",
        #     partial: "palettes/preview",
        #     locals: { palette: @palette }
        #   )
        # end
        format.html { redirect_to @palette, notice: "Palette was successfully updated." }
      end
    else
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "preview",
            partial: "palettes/preview",
            locals: { palette: @palette }
          ), status: :unprocessable_entity
        end
        format.html { render :edit }
      end
    end
  end

  def destroy
    @palette.destroy
    redirect_to palettes_path, notice: 'Palette was successfully deleted.'
  end
  
  private
  
  def set_palette
    @palette = Palette.find(params[:id])
  end

  def palette_params
    params.require(:palette).permit(
      :name,
      colour_stops_attributes: [:id, :position, :percentage, :hex, :_destroy]
    )
  end
end
