class Palette < ApplicationRecord
  has_many :colour_stops, -> { order(position: :asc) }, dependent: :destroy, inverse_of: :palette

  validates :name, presence: true
  validates_length_of :colour_stops, minimum: 2, maximum: 15

  accepts_nested_attributes_for :colour_stops, allow_destroy: true, reject_if: :all_blank
 

  def data
    {
      stops: colour_stops.order(:position).pluck(:percentage),
      colours: colour_stops.order(:position).pluck(:hex)
    }
  end

  def next_colour_stop
    next_position = last_colour_stop&.position.to_i + 1
    next_percentage = last_colour_stop&.percentage.to_f + 0.1

    colour_stops.build(position: next_position, percentage: next_percentage, hex: last_colour_stop&.hex)
  end 

  def last_colour_stop
    colour_stops.order(:position).last
  end
end
