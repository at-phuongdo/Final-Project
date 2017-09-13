class ShowItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :avatar, :status, :quantity
end
