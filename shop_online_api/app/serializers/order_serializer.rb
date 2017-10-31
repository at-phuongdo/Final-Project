class OrderSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :status, :trans_at, :created_at, :updated_at
  has_one :payment
  has_many :order_items
end
