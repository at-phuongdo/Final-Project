class Api::V1::DetailsController < ApplicationController

  def show
    @item = Item.find_by_id(params[:id])
    if @item
      id_cate = ItemsCategory.find_by(item_id: params[:id]).category_id
      id_item = ItemsCategory.where(category_id: id_cate).map(&:item_id)
      @relativeItem = Item.find(id_item)
      render json: { item: @item, relativeItem: @relativeItem }
    else
      render json: { message: 'Cannot found this product!'}
    end
  end
end
