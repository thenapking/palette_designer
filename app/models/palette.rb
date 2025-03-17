class Palette < ApplicationRecord
  has_many :colour_stops, -> { order(position: :asc) }, dependent: :destroy, inverse_of: :palette

  validates :name, presence: true
  validates_length_of :colour_stops, minimum: 2, maximum: 15

  accepts_nested_attributes_for :colour_stops, allow_destroy: true, reject_if: :all_blank
 

  def to_json_palette
    {
      stops: colour_stops.order(:position).pluck(:percentage),
      colours: colour_stops.order(:position).pluck(:hex)
    }
  end
end
