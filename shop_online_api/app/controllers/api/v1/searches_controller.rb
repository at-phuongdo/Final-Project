class Api::V1::SearchesController < ApplicationController
  def index
    page = params[:page].to_i
    per_page = params[:per_page].to_i
    items = Item.where('name like ?', "%#{params[:key]}%")
    page_total = (items.length - 1) / per_page + 1
    item = items.paging(page, per_page)
    render json: item, each_serializer: ShowItemSerializer, adapter: :json, meta: { total: page_total, status: :ok }
  end
end
