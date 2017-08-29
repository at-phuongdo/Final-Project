class Api::V1::DetailsController < ApplicationController
  def show
   @item = Item.find_by_id(params[:id])
   if @item
    render json: @item
  else
    render json: { message: 'Cannot found this product!'}
  end
end
end
