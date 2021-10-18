class AddOverallToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :overall_rating, :integer, :null => false
  end
end
