class Api::V1::OrdersController < ApplicationController
  def index
    user = User.find_by(confirm_token: params[:confirm_token])
    page = params[:page].to_i || Common::Com::Order::PAGE_DEFAULT
    per_page = Common::Com::Order::PER_PAGE
    if user
      orders = user.orders
      total = (orders.length - 1) / per_page + 1
      render json: orders.paging(page, per_page), adapter: :json, meta: { total: total, status: :ok }
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
    sum  = 0
    if user
      @order = Order.new(order_params)
      @order.update(user_id: user.id, status: 'Waiting')
      order_items = params[:orderItems]
      if order_items && @order.save
        ActiveRecord::Base.transaction do
          order_items.each do |order_item|
            OrderItem.create(price: order_item[:price], quantity: order_item[:quantity], item_id: order_item[:id], order_id: @order.id)
            item = Item.find_by(id: order_item[:id])
            item.update(quantity: item[:quantity] - order_item[:quantity])
            sum += order_item[:quantity] * order_item[:price]
          end
        end
        render json: @order, status: :created
        user.send_order(@order, order_items, sum)
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def update
    order = Order.find_by(id: params[:id])
    if order.status == 'Waiting'
      sum = 0
      new_order_items = params[:orderItems]
      ActiveRecord::Base.transaction do
        new_order_items.each do |order_item|
          order_item1 = OrderItem.find_by(id: order_item[:id])
          item = Item.find_by(id: order_item[:item][:id])
          temp = order_item1.quantity - order_item[:quantity]
          render json: { msg: "#{item.name} don't have enough quantity!", status: :unprocessable_entity } if item[:quantity] + temp < 0
          order_item1.update(quantity: order_item[:quantity])
          item.update(quantity: item[:quantity] - temp)
          sum += order_item[:quantity] * order_item[:price]
        end
      end
      render json: order, status: :ok
    end
  end

  def destroy
    order = Order.find_by(id: params[:id])
    order.destroy
  end
  private

  def order_params
    params.require(:order).permit(:name, :phone, :address)
  end
end
