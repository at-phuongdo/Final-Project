class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :avatar, :status, :quantity
end
