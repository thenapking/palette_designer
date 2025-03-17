# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_03_16_135823) do
  create_table "colour_stops", force: :cascade do |t|
    t.integer "palette_id", null: false
    t.integer "position", null: false
    t.float "percentage", null: false
    t.string "hex", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["palette_id", "position"], name: "index_colour_stops_on_palette_id_and_position", unique: true
    t.index ["palette_id"], name: "index_colour_stops_on_palette_id"
  end

  create_table "palettes", force: :cascade do |t|
    t.string "name"
    t.json "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "colour_stops", "palettes"
end
