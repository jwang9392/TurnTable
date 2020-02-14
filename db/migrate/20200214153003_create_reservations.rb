class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.time :time, null: false
      t.date :date, null: false
      t.string :occasion
      t.text :special_request
      t.integer :party_size, null: false
      t.integer :user_id, null: false
      t.integer :venue_id, null: false

      t.timestamps
    end

    add_index :reservations, :user_id
    add_index :reservations, :venue_id
    add_index :reservations, [:user_id, :time, :date], unique: true
  end
end
