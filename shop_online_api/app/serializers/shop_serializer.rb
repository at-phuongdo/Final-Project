class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :email, :type
  has_many :supliers
  has_many :items
end
