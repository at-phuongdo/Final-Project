class Item < ApplicationRecord
  has_many :items_categories
  has_many :categorys, through: :items_categories
  has_many :images_items
  has_many :comments
  has_many :order_items
  belongs_to :unit
  belongs_to :shop
end
