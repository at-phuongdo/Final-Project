class Api::V1::OrdersController < ApplicationController
  def index
    user = User.find_by(confirm_token: params[:confirm_token])
    page = params[:page] || Common::Com::Order::PAGE_DEFAULT
    per_page = params[:per_page] || Common::Com::Order::PER_PAGE
    if user
      render json: user.orders.paging(page, per_page), status: :ok
    else
      render json: { msg: 'Not found User by Token', status: :unprocessable_entity }
    end
  end

  def show
    order = Order.find_by(id: params[:id])
    if order
      order_items = order.order_items
      render json: order_items, status: :ok
    else
      render json: { msg: 'Order not found, status: :unprocessable_entity'}
    end
  end

  def create
    confirm_token = request.headers['Access-token']
    user = User.find_by(confirm_token: confirm_token)
    if user
      @order = Order.new(order_params)
      @order.update(user_id: user.id)
      order_items = params[:orderItems]
      if order_items && @order.save
        ActiveRecord::Base.transaction do
          order_items.each do |order_item|
            OrderItem.create(price: order_item[:price], quantity: order_item[:quantity], item_id: order_item[:id], order_id: @order.id)
          end
        end
        render json: @order, status: :created
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def order_params
    params.require(:order).permit(:name, :phone, :address)
  end
end
