class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :status, :order_id
  belongs_to :order
end
