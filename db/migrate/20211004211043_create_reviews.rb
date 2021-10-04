class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :venue_id, null: false
      t.integer :music_rating, null: false
      t.integer :service_rating, null: false
      t.integer :ambience_rating, null: false
      t.text :review_body, null: false

      t.timestamps
    end

    add_index :reviews, [:user_id, :venue_id], unique: true
  end
end
