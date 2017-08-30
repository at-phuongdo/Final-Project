class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :quantity, :order_id
end
