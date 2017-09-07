class Api::V1::SearchesController < ApplicationController
  def show
    item = ItemsCategory.where(category_id: params[:id])
    item_id = item.map(&:item_id)
    if params[:order] == 'name'
      if params[:dir] == 'asc'
        list_product = Item.order(:name).find(item_id)
      else
        list_product = Item.order(name: :DESC).find(item_id)
      end
    else 
      if params[:dir] == 'asc'
        list_product = Item.order(:price).find(item_id)
      else
        list_product = Item.order(price: :DESC).find(item_id)
      end
    end

    if list_product
      render json: { list_product: list_product, status: :ok }
    else
      render json: { status: :no_content }
    end
  end
end
