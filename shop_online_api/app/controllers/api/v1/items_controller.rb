class Api::V1::ItemsController < ApplicationController
  def index
    if params[:check] == 'new'
      @items = Item.last(8)
    elsif params[:check] == 'best'
      order = OrderItem.select(:item_id, 'COUNT(item_id) as sl').group(:item_id).order('sl DESC')
      ids = order.map(&:item_id)
      @items = Item.find(ids)
    else
      @items = Item.all
    end
    if @items
      render json: @items, status: :ok
    else
      render json: { message: 'errors', status: :no_content }
    end
  end

  def show
    item = Item.find_by(id: params[:id])
    if item
      render json: item, each_serializer: ShowItemSerializer, status: :ok
    else
      render json: { message: 'ID incorrect', status: :unprocessable_entity }
    end
  end
end
