require 'rails_helper'

RSpec.describe Palette, type: :model do
  
  it { should have_many(:colour_stops).dependent(:destroy).inverse_of(:palette) }
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:colour_stops).is_at_least(2).is_at_most(15) }
  it { should accept_nested_attributes_for(:colour_stops).allow_destroy(true) }

  it "has a valid factory" do
    palette = create(:palette)
    expect(palette).to be_valid
  end

  it "is invalid without a name" do
    palette = build(:palette, name: nil)
    expect(palette).not_to be_valid
  end
end
