class ItemController < ApplicationController
  before_action :set_item, only: [:show, :destroy, :update]
  def index
    @items = Item.all
    render json: @items
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

  # Use callbacks to share common setup or constraints between actions.
  def set_item
    @user = Item.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through
  def item_params
    params.require(:item).permit(:name, :price, :quantity, :avatar)
  end
end
