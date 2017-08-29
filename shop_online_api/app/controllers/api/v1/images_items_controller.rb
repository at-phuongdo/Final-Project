class Api::V1::ImagesItemsController < ApplicationController
  def index
    @images_item = ImagesItem.where(item_id: params[:item_id])
    render json: @images_item
  end
end
