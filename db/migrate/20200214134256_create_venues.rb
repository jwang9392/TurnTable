class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.string :phone_number, null: false
      t.integer :capacity, null: false

      t.timestamps
    end

    add_index :venues, :name
    add_index :venues, :city
    add_index :venues, :state
    add_index :venues, :capacity
  end
end
