class CreatePalettes < ActiveRecord::Migration[7.2]
  def change
    create_table :palettes do |t|
      t.string :name
      t.json :data

      t.timestamps
    end
  end
end
