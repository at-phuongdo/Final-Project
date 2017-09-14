class Api::V1::ShopController < ApplicationController
  before_action :set_shop, only: :show

  def show
    reder json: @shop
  end

  private

  def set_shop
    @shop = Shop.find(params[:id])
  end
end
