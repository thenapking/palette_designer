class ColorStop < ApplicationRecord
  belongs_to :palette, inverse_of: :color_stops
  
  validates :position, presence: true, numericality: { only_integer: true }
  validates :position_percent, presence: true, 
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
  validates :color_hex, presence: true, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }
  

end
