class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :firstname, :lastname, :phone, :address, :gender, :birthday, :avatar
end
