class UnitSerializer < ActiveModel::Serializer
  attributes :id, :name, :syntax
  has_many :items
end
