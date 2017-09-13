class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET user by token
  def show
    if params[:id]
      @user = User.find_by(confirm_token: params[:id])
      render json: @user
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
      @user.send_activation_email
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    confirm_token = request.headers['Access-token']
    if @user.confirm_token == confirm_token
      if @user.update(user_update)
        render json: @user, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { msg: 'Token invalid', status: :unprocessable_entity }
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :password)
  end

  def user_update
    params.require(:user).permit(:firstname, :lastname, :email, :gender, :birthday, :address, :phone)
  end
end
