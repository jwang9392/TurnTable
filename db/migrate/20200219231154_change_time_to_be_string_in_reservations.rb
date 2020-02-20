class ChangeTimeToBeStringInReservations < ActiveRecord::Migration[5.2]
  def change
    change_column :reservations, :time, :string
  end
end
