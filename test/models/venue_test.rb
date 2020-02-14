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

require 'test_helper'

class VenueTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
