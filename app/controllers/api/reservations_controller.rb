class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.includes(:venue).where("user_id = ?", params[:userId])

    render :index
  end

  def show
    @reservation = Reservation.find_by(id: params[:id])

    render :show
  end

  def create
    @reservation = Reservation.new(reservation_params)
    @action = 'POST'
    @error = 0

    if @reservation.save
        render :show
    else
        render json: @reservation.errors.full_messages, status: 422
    end
  end

  def update
    @reservation = Reservation.find_by(id: params[:id])
    @action = 'UPDATE'
    @error = 1

    if @reservation.update(reservation_params)
        render :show
    else
        render json: @reservation.errors.full_messages, status: 422
    end
  end

  def destroy
    @reservation = Reservation.find_by(id: params[:id])
    @action = 'DESTROY'
    @error = 2

    if @reservation.destroy!
        render :show
    else
        render json: ["Reservation does not exist."]
    end
  end

  private

  def reservation_params
    params.require(:reservation).permit(
        :date,
        :time,
        :party_size,
        :occasion,
        :special_request,
        :venue_id,
        :user_id
    )
  end

end
