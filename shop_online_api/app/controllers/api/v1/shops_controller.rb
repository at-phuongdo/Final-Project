class Api::V1::ShopsController < ApplicationController
  before_action :set_shop, only: :show

  def index
    shop = Shop.all
    if shop
      render json: shop, each_serializer: ShopInfoSerializer, status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  def show
    page = params[:page] || Common::Com::Shop::PAGE_DEFAULT
    per_page = params[:per_page] || Common::Com::Shop::PER_PAGE
    items = @shop.items
    page_total = (items.length - 1) / per_page + 1
    @shop.items = items.paging(page.to_i, per_page.to_i)
    render json: @shop, adapter: :json, meta: { total: page_total, status: :ok }
  end

  private

  def set_shop
    @shop = Shop.find(params[:id])
  end
end
