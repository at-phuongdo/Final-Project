class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :status, :order_id
end
