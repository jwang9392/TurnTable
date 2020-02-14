class Api::VenuesController < ApplicationController

  def index
    @venues = Venue.all

    render :index
  end
    
  def show
    @venue = Venue.find_by(id: params[:id])

    if @venue
      render :show
    else
      render json: ['Venue does not exist']
    end
  end


  private

  def venue_params
    params.require(:venue).permit(:name, :address, :city, :state, :zipcode, :phone_number, :capacity)
  end

end
