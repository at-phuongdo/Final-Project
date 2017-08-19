class Category < ApplicationRecord
  has_and_belongs_to_many :items
  has_many :child, class_name: "Category", foreign_key: "cate_id"
  belongs_to :sub, class_name: "Category"
end
