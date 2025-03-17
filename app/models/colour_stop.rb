class ColourStop < ApplicationRecord
  belongs_to :palette, inverse_of: :colour_stops
  
  validates :position, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 16 }
  validates :percentage, presence: true, 
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
  validates :hex, presence: true, format: { with: /\A#(?:[0-9a-fA-F]{3}){1,2}\z/ }
  

end
