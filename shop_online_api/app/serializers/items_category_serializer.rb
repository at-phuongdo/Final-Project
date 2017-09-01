class ItemsCategorySerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :item
  belongs_to :category
end
