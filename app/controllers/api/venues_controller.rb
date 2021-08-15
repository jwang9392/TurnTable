class Api::VenuesController < ApplicationController

  def index
    @venues = Venue.includes(:reservations).all

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

  def search
    @venues = Venue.search(params["searchParams"]) 

    render :index
  end

  private

  def venue_params
    params.require(:venue).permit(:name, :address, :city, :state, :zipcode, :phone_number, :capacity, :search)
  end

end
