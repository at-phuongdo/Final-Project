class OrderSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :status, :trans_at
end
