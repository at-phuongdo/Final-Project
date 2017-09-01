class Api::V1::OrdersController < ApplicationController
  def index
    @orders = Order.all
      render json: @users, status: :ok
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    confirm_token = request.headers['Access-token']
    @user = User.find_by(confirm_token: confirm_token)
    if @user
      
    else
    end
  end

  private

  def order_params
    params.require(:order).permit(:name, :phone, :address)
  end
end
