# db/migrate/YYYYMMDDHHMMSS_create_color_stops.rb
class CreateColourStops < ActiveRecord::Migration[7.0]
  def change
    create_table :color_stops do |t|
      t.references :palette, null: false, foreign_key: true
      t.integer :position, null: false
      t.float :position_percent, null: false
      t.string :color_hex, null: false

      t.timestamps
    end
    
    add_index :color_stops, [:palette_id, :position], unique: true
  end
end

