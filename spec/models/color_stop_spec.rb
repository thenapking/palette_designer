require 'rails_helper'

RSpec.describe ColorStop, type: :model do
  it { should belong_to(:palette).inverse_of(:color_stops) }
  it { should validate_presence_of(:position) }
  it { should validate_numericality_of(:position).only_integer }
  it { should validate_presence_of(:position_percent) }
  it { should validate_numericality_of(:position_percent).is_greater_than_or_equal_to(0).is_less_than_or_equal_to(1) }
  it { should validate_presence_of(:color_hex) }
 
  it { should allow_value('#ffffff').for(:color_hex) }
  it { should allow_value('#a1b2c3').for(:color_hex) }
  it { should_not allow_value('fff').for(:color_hex) }
  it { should_not allow_value('123456').for(:color_hex) }
  it { should_not allow_value('#12').for(:color_hex) }
  
end
