class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.includes(:venue, :user).where("venue_id = ?", params[:venue_id])

    render :index
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:music_rating, :service_rating, :ambience_rating, :review_body, :user_id, :venue_id)
  end
end