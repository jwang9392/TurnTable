class AddColumnsToVenue < ActiveRecord::Migration[5.2]
  def change
    add_column :venues, :price, :string, :null => false
    add_column :venues, :genre, :string, :null => false
    add_column :venues, :rating, :decimal
  end
end
