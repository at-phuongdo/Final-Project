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
    category_name = Category.find(params[:id]).name
    page = params[:page].to_i
    per_page = params[:per_page].to_i

    if params[:check] == 'overview'
      item = ItemsCategory.where(category_id: params[:id])
      item_id = item.map(&:item_id)
      list_product = Item.where(id: item_id).limit(4)
    else
      sub_cate = Category.where(parent_id: params[:id])
      if sub_cate != []
        ids = sub_cate.map(&:id)
        item_id = ItemsCategory.where(category_id: ids).map(&:item_id)
        item = Item.where(id: item_id)
      else
        item = Category.find(params[:id]).items
      end
      list_product = Item.sort(params[:order] || 'name', params[:dir] || 'asc', item)
      list_product = list_product.paging(page, per_page)
      total_page = (list_product.length - 1) / per_page + 1
    end

    if list_product
      render json: list_product, adapter: :json, each_serializer: ShowItemSerializer, meta: { status: :ok, total: total_page, categoryName: category_name }
    else
      render json: { message: 'errors', status: :no_content }
    end
  end
end
