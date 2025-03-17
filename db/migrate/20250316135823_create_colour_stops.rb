# db/migrate/YYYYMMDDHHMMSS_create_colour_stops.rb
class CreateColourStops < ActiveRecord::Migration[7.0]
  def change
    create_table :colour_stops do |t|
      t.references :palette, null: false, foreign_key: true
      t.integer :position, null: false
      t.float :percentage, null: false
      t.string :hex, null: false

      t.timestamps
    end
  end
end

