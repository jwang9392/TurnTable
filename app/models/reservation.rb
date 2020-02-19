class Reservation < ApplicationRecord
  validates :time, :date, :party_size, presence: true
  validates :user_id, uniqueness: { scope: [:time, :date] }

  belongs_to :venue
  belongs_to :user

  # Time.parse()

  # var.strftime("%I:%M%p")

end
