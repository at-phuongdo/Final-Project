class Api::V1::CategoriesController < ApplicationController
  def index
    if params[:check] == 'sub'
      # Find the parents category( has parent_id: 0), then find all children of them( sub_cate)
      cate_id = Category.where(parent_id: 0).map(&:id) 
      sub_cate = Category.where(parent_id: cate_id)
      if sub_cate
        render json: { message: 'complete', status: :ok, sub_cate: sub_cate }
      else
        render json: { message: 'errors', status: :no_content }
      end
    else
      cate = Category.where(parent_id: 0)
      render json: cate, adapter: :json, each_serializer: CategorySerializer, meta: { status: :ok, message: 'Completed' }
    end
  end

  def show
    if params[:check] == 'all'
      list_product = Category.find(params[:id]).items
      page = params[:page].to_i
      per_page = params[:per_page].to_i
      total_page = (list_product.length - 1) / per_page + 1
      list_product = list_product.paging(page, per_page)
    else
      item = ItemsCategory.where(category_id: params[:id])
      item_id = item.map(&:item_id)
      list_product = Item.where(id: item_id).limit(4)
    end

    if list_product
      render json: list_product, adapter: :json, each_serializer: ItemSerializer, meta: { status: :ok, total: total_page }
    else
      render json: { message: 'errors', status: :no_content }
    end
  end
end
