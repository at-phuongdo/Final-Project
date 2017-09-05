class Api::V1::CategoriesController < ApplicationController
  def index
    if params[:check] == 'sub'
      @cate_id = Category.where(parent_id: 0).map(&:id)
      @sub_cate = Category.where(parent_id: @cate_id)
      if @sub_cate
        render json: { message: 'complete', status: :ok, sub_cate: @sub_cate }
      else
        render json: { message: 'errors', status: :no_content }
      end
    else
      @cate = Category.where(parent_id: 0).includes(:child)
      render json: @cate
    end
  end

  def show
    if params[:check] == 'all'
      @item = ItemsCategory.where(category_id: params[:id])
      @item_id = @item.map(&:item_id)
      @list_product = Item.find(@item_id)
    else
      @item = ItemsCategory.where(category_id: params[:id])
      @item_id = @item.map(&:item_id)
      @list_product = Item.where(id: @item_id).limit(3)
    end

    if @list_product
      render json: { message: 'complete', status: :ok, list_product: @list_product }
    else
      render json: { message: 'errors', status: :no_content }
    end
  end
end
