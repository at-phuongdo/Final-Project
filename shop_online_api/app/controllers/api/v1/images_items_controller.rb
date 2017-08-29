class Api::V1::ImagesItemsController < ApplicationController
  def index
    @image_items = ImagesItem.where(item_id: params[:item_id]).limit(3)
    if @image_items
      render json: { image_items: @image_items, status: :ok }
    else
      render json: { status: :no_content }
    end
  end
end
