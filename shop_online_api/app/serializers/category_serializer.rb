class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :child, class_name: 'Category', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Category', optional: true
end
