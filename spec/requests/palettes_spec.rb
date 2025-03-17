require 'rails_helper'

RSpec.describe "Palettes", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/palettes"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/palettes/1"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get "/palettes/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "returns http success" do
      post "/palettes", params: { palette: { name: "New Palette" } }
      expect(response).to have_http_status(:redirect)
    end
  end

  describe "GET /edit" do
    it "returns http success" do
      get "/palettes/1/edit"
      expect(response).to have_http_status(:success)
    end
  end

  describe "PATCH /update" do
    it "returns http success" do
      patch "/palettes/1", params: { palette: { name: "Updated Palette" } }
      expect(response).to have_http_status(:redirect)
    end
  end

  xdescribe "DELETE /destroy" do
    it "returns http success" do
      delete "/palettes/1"
      expect(response).to have_http_status(:redirect)
    end
  end
end
