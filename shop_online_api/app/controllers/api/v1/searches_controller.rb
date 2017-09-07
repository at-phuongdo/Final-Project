class Api::V1::SearchesController < ApplicationController
  def show
    item = Category.find(params[:id]).items
    list_product = Item.sort(params[:order], params[:dir], item)
    if list_product
      render json: { list_product: list_product, status: :ok }
    else
      render json: { status: :no_content }
    end
  end
end
