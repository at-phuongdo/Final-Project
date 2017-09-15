class Api::V1::DetailsController < ApplicationController
  def show
    @item = Item.find_by(id: params[:id])
    if @item
      id_cate = ItemsCategory.find_by(item_id: params[:id]).category_id
      id_item = ItemsCategory.where(category_id: id_cate).map(&:item_id)
      id_item.delete(params[:id].to_i)
      relative_item = Item.where(id: id_item)
      render json: @item, adapter: :json, meta: {relativeItem: relative_item, status: :ok }
    else
      render json: { message: 'Cannot found this product!', status: :no_content }
    end
  end
end
