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

  validates :name, :address, :city, :state, :zipcode, :phone_number, :capacity, presence: true
  
  has_many :reservations
end
