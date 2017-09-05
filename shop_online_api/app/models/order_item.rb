class OrderItem < ApplicationRecord
  belongs_to :item
  belongs_to :order

  # def createOrderItem order_item_params
  #   OrderItem.create(order_item_params)
  # end
end
