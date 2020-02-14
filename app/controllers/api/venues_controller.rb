class Api::VenuesController < ApplicationController

  def index
    @venues = Venue.all

    render json: ['placeholder']
  end

  private

  def venue_params
    params.require(:venue).permit(:name, :address, :city, :state, :zipcode, :phone_number, :capacity)
  end

end
