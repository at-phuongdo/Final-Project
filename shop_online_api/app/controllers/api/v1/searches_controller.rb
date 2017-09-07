class Api::V1::SearchesController < ApplicationController
  def show
    item = ItemsCategory.where(category_id: params[:id])
    item_id = item.map(&:item_id)
    list_product = Item.sort(params[:order], params[:dir], item_id)

    if list_product
      render json: { list_product: list_product, status: :ok }
    else
      render json: { status: :no_content }
    end
  end
end
