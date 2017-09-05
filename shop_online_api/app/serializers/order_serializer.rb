class OrderSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :status, :trans_at
  has_many :order_items
  has_one :payment
  belongs_to :user
end
