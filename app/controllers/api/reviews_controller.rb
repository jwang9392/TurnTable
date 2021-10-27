class Api::ReviewsController < ApplicationController
  def index
    @param = ""

    if params[:venue_id]
      @param = "venue"
      @reviews = Review.includes(:venue, :user).where("venue_id = ?", params[:venue_id])
    elsif params[:user_id]
      @param = "user"
      @reviews = Review.includes(:venue, :user).where("user_id = ?", params[:user_id])
    end

    render :index
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render json: ["Review Created"]
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:overall_rating, :music_rating, :service_rating, :ambience_rating, :review_body, :user_id, :venue_id)
  end
end