class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :firstname, :lastname, :phone, :address, :gender, :birthday, :avatar
  has_many :orders
  has_many :comments
end
