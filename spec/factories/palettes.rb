FactoryBot.define do
  factory :palette do
    name { "My Palette" }
    
    after(:build) do |palette|
      palette.colour_stops << build(:colour_stop, palette: palette, position: 0, percentage: 0, hex: "#FF0000")
      palette.colour_stops << build(:colour_stop, palette: palette, position: 1, percentage: 0.5, hex: "#00FF00")
      palette.colour_stops << build(:colour_stop, palette: palette, position: 2, percentage: 1, hex: "#0000FF")
    end
  end
end
