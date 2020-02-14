class Api::VenuesController < ApplicationController

  

  private

  def venue_params
    params.require(:venue).permit(:name, :address, :city, :state, :zipcode, :phone_number, :capacity)
  end

end
