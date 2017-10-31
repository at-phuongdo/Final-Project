class Api::V1::ShopsController < ApplicationController
  def index
    shops = Shop.all
    if shops
      render json: shops, each_serializer: ShopInfoSerializer, status: :ok
    else
      render status: :unprocessable_entity
    end
  end

  def show
    shop = Shop.find_by(id: params[:id])
    if shop
      page = params[:page] || Common::Com::Shop::PAGE_DEFAULT
      per_page = params[:per_page] || Common::Com::Shop::PER_PAGE
      items = shop.items
      page_total = (items.length - 1) / per_page + 1
      shop.items = items.paging(page.to_i, per_page.to_i)
      render json: shop, adapter: :json, meta: { total: page_total, status: :ok }
    else
      render status: :unprocessable_entity
    end
  end

  private

  def set_shop
    @shop = Shop.find(params[:id])
  end
end
