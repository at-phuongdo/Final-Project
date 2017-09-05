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
    user = User.find_by(confirm_token: confirm_token)
    ActiveRecord::Base.transaction do
      @order = Order.new(order_params)
      @order.update(user_id: user.id)
      order_items = params[:orderItems]
      if order_items && @order.save
        order_items.each do |order_item|
          OrderItem.create(price: order_item[:price], quantity: order_item[:quantity], item_id: order_item[:id], order_id: @order.id)
        end
        render json: @order, status: :created
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  end

  private

  def order_params
    params.require(:order).permit(:name, :phone, :address)
  end
end
