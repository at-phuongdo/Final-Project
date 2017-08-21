class Category < ApplicationRecord
  has_and_belongs_to_many :items
  has_many :child, class_name: 'Category', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Category'
end
