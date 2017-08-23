class Api::V1::ResetPasswordsController < ApplicationController

  def create
    @user = User.find_by_email(params[ :email])
    @user.reset_password
    @user.send_reset_password_email
  end

  def resetPassword
    @user = User.find_by_reset_password_token(params[:id])
    if @user && @user.confirm_at
      redirect_to "http://localhost:4200/updatePassword/#{@user.reset_password_token}"
    end
  end

  def update
    @user = User.find_by_reset_password_token(params[:id])
    if @user.update(password: params[:password])
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
end
