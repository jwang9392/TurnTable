class ChangeUserConstraintInReservations < ActiveRecord::Migration[5.2]
  def change
    change_column :reservations, :user_id, :integer, :null => true
  end
end
