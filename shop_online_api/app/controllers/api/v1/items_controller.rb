class Api::V1::ItemsController < ApplicationController
  before_action :set_item, only: [:show, :destroy, :update]
  def index
    @items = Item.all
    render json: { msg: 'complete', status: 200, items: @items }
  end

  def show
    render json: @item
  end

  def destroy
    @item.destroy
    render
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors
    end
  end

  def create
    item = Item.new(item_params)
    if @item.save
      render json: @item, status: :created
    else
      render json: @item.errors
    end
  end

  private

  def set_item
    @user = Item.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :price, :quantity, :avatar)
  end
end
