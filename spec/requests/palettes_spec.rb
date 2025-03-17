require 'rails_helper'

RSpec.describe "Palettes", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/palettes"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    let(:palette) { create(:palette) }

    it "returns http success" do
      get "/palettes/#{palette.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get "/palettes/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /palettes" do
    it "creates a palette with 3 colour stops" do
      palette_params = {
        palette: {
          name: "Test Palette",
          colour_stops_attributes: {
            "0" => { position: 0, percentage: 0.0, hex: "#111111" },
            "1" => { position: 1, percentage: 0.5, hex: "#222222" },
            "2" => { position: 2, percentage: 1.0, hex: "#333333" }
          }
        }
      }

      expect {
        post palettes_path, params: palette_params
      }.to change(Palette, :count).by(1)

      palette = Palette.last
      expect(palette.name).to eq("Test Palette")
      expect(palette.colour_stops.count).to eq(3)
      expect(palette.colour_stops.pluck(:hex)).to match_array(["#111111", "#222222", "#333333"])
    end
  end

  describe "GET /edit" do
    let(:palette) { create(:palette) }

    it "returns http success" do
      get "/palettes/#{palette.id}/edit"
      expect(response).to have_http_status(:success)
    end
  end

  describe "PATCH /palettes/:id" do
    let!(:palette) { create(:palette, name: "Original Palette") }
    let(:stop1) { palette.colour_stops.find_by(position: 0) }
    let(:stop2) { palette.colour_stops.find_by(position: 1) }
    let(:stop3) { palette.colour_stops.find_by(position: 2) }

    it "returns http success" do
      patch "/palettes/#{palette.id}", params: { palette: { name: "Updated Palette" } }
      expect(response).to have_http_status(:redirect)
    end

    it "edits the palette: reorders stops, removes one, adds a new one, and updates values" do
      update_params = {
        palette: {
          name: "Updated Palette",
          colour_stops_attributes: {
            "0" => { id: stop1.id, position: 1, percentage: 0.3, hex: "#AAAAAA" },
            "1" => { id: stop2.id, position: 0, percentage: 0.2, hex: "#BBBBBB" },
            "2" => { id: stop3.id, _destroy: "1" },
            "3" => { position: 2, percentage: 0.8, hex: "#CCCCCC" }
          }
        }
      }

      patch palette_path(palette), params: update_params
      palette.reload

      expect(palette.name).to eq("Updated Palette")
      expect(palette.colour_stops.count).to eq(3)

      stops = palette.colour_stops.order(:position)
      
      expect(stops.pluck(:position)).to eq([0, 1, 2])
      expect(stops.pluck(:percentage)).to eq([0.2, 0.3, 0.8])
      expect(stops.pluck(:hex)).to eq(["#BBBBBB", "#AAAAAA", "#CCCCCC"])
    end
  end

  describe "DELETE /destroy" do
    let(:palette) { create(:palette) }

    it "returns http success" do
      delete "/palettes/#{palette.id}"
      expect(response).to have_http_status(:redirect)
    end
  end
end
