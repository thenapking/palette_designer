class Palette < ApplicationRecord
  has_many :colour_stops, -> { order(position: :asc) }, dependent: :destroy, inverse_of: :palette

  after_save :reorder_stops
  
  validates :name, presence: true
  validates_length_of :colour_stops, minimum: 2, maximum: 15

  accepts_nested_attributes_for :colour_stops, allow_destroy: true, reject_if: :all_blank
  
  def reorder_stops
    colour_stops.each_with_index do |stop, index|
      stop.update_column(:position, index)
    end
  end

  def move(stop_id, direction)
    stop = colour_stops.find(stop_id)

    sql_where = "position #{direction == 'up' ? '<' : '>'} ?"
    sql_sort = direction == 'up' ? :desc : :asc

    other_stop = colour_stops.where(sql_where, stop.position).order(position: sql_sort).first

    if other_stop
      current_position = stop.position
      stop.update_column(:position, other_stop.position)
      other_stop.update_column(:position, current_position)
    end
  end
  
  def to_json_palette
    {
      stops: colour_stops.order(:position).pluck(:percentage),
      colours: colour_stops.order(:position).pluck(:hex)
    }
  end
end
