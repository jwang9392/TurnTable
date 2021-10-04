# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_04_211043) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reservations", force: :cascade do |t|
    t.string "time", null: false
    t.date "date", null: false
    t.string "occasion"
    t.text "special_request"
    t.integer "party_size", null: false
    t.integer "user_id", null: false
    t.integer "venue_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "time", "date"], name: "index_reservations_on_user_id_and_time_and_date", unique: true
    t.index ["user_id"], name: "index_reservations_on_user_id"
    t.index ["venue_id"], name: "index_reservations_on_venue_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "venue_id", null: false
    t.integer "music_rating", null: false
    t.integer "service_rating", null: false
    t.integer "ambience_rating", null: false
    t.text "review_body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "venue_id"], name: "index_reviews_on_user_id_and_venue_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone_number"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username"
  end

  create_table "venues", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zipcode", null: false
    t.string "phone_number", null: false
    t.integer "capacity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "price", null: false
    t.string "genre", null: false
    t.decimal "rating"
    t.index ["capacity"], name: "index_venues_on_capacity"
    t.index ["city"], name: "index_venues_on_city"
    t.index ["name"], name: "index_venues_on_name"
    t.index ["state"], name: "index_venues_on_state"
  end

end
