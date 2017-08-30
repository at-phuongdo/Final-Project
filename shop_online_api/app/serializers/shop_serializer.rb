class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :email, :type
end
