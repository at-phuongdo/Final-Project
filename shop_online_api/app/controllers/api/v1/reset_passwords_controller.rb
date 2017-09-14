class Api::V1::ResetPasswordsController < ApplicationController

  def create
    @user = User.find_by_email(params[ :email])
    if @user 
      if @user.confirm_at
        @user.reset_password
        @user.send_reset_password_email
      else
        render json: { status: :not_active, message: 'You account is not actived. Please check email to confirm!' }
      end
    else
      render json: { status: :not_exist, message: 'Account is not exist.Please try again'}
    end
  end

  def resetPassword
    @user = User.find_by_reset_password_token(params[:id])
    if @user
      if @user.confirm_at
        redirect_to "http://localhost:4200/updatePassword/#{@user.reset_password_token}"
      else
        render json: { status: :not_active, message: 'You account is not actived. Please check email to confirm!' }
      end
    else
      render json: { status: :not_exist, message: 'Account is not exist. Please checkmail again'}
    end
  end

  def update
    @user = User.find_by_reset_password_token(params[:id])
    if @user
      if @user.update(password: params[:password])
        render json: { status: :success, message: 'Your password is update. Please login to continue'}
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { status: :not_exist, message: 'Account is not exist. Please checkmail again'}
    end
  end
end
