class Api::UsersController < ApplicationController
  def show
    @user = User.find_by(id: params[:id])
    
    if @user
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def create
    @user = User.new(user_params)

    
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    password = user_params[:password]
    @action = 'UPDATE'

    if @user.update(user_params.except(:password))
      if !!password
        @user.password=(password)
      end

        @user.save
        render :show
    else
        render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :username, :phone_number)
  end
end
