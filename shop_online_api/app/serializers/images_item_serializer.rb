class ImagesItemSerializer < ActiveModel::Serializer
  attributes :id, :image
  belongs_to :item
end
