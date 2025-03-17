require 'rails_helper'

RSpec.describe ColourStop, type: :model do
  it { should belong_to(:palette).inverse_of(:colour_stops) }
  it { should validate_presence_of(:position) }
  it { should validate_numericality_of(:position).only_integer }
  it { should validate_presence_of(:percentage) }
  it { should validate_numericality_of(:percentage).is_greater_than_or_equal_to(0).is_less_than_or_equal_to(1) }
  it { should validate_presence_of(:hex) }
 
  it { should allow_value('#ffffff').for(:hex) }
  it { should allow_value('#a1b2c3').for(:hex) }
  it { should_not allow_value('fff').for(:hex) }
  it { should_not allow_value('123456').for(:hex) }
  it { should_not allow_value('#12').for(:hex) }
  
end
