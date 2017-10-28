class Api::V1::OrderItemsController < ApplicationController
  before_action :set_order_item, only: :destroy
  def destroy
    @order_item.destroy
  end

  private

  def set_order_item
    @order_item = OrderItem.find_by(id: params[:id])
  end
end
