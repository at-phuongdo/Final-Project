class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :price, :quantity
  belongs_to :item
  belongs_to :order
end
