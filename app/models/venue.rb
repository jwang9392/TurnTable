# == Schema Information
#
# Table name: venues
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  address      :string           not null
#  city         :string           not null
#  state        :string           not null
#  zipcode      :string           not null
#  phone_number :string           not null
#  capacity     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
# 

class Venue < ApplicationRecord
  CITIES = [
    ['New York', 'NY'],
    ['Chicago', 'IL'],
    ['Los Angeles', 'CA'],
    ['San Francisco', 'CA'],
    ['Miami', 'FL'],
    ['Los Vegas', 'NV'],
    ['Houston', 'TX'],
    ['Atlanta', 'GA'],
    ['Denver', 'CO'],
    ['Orlando', 'FL'],
    ['Philadelphia', 'PA'],
    ['Dallas', 'TX']
  ]

  GENRES = [
    "Jazz Clubs", 
    "Dance Clubs",
    "Live Music Venues",
    "Sports-Themed Clubs",
    "Comedy Club"
  ]

  PRICE_RANGES = [
    "$100 and under",
    "$101 to $400",
    "$401 and over"
  ] 

  validates :name, :address, :city, :state, :zipcode, :phone_number, :capacity, presence: true
  
  has_many :reservations

  # ADD COLUMN FOR OVERALL RATING?

  def reservation_count
    self.reservations
      .where(created_at: Time.now.beginning_of_day..Time.now.end_of_day)
      .count
  end

  def self.search(searchParams)
    where(
      "name ILIKE ? OR 
      city ILIKE ? OR 
      state ILIKE ?",
      "%#{searchParams}%", 
      "%#{searchParams}%", 
      "%#{searchParams}%"
    )
  end

end
