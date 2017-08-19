class Item < ApplicationRecord
  has_and_belongs_to_many :categorys
  has_many :images_items
  has_many :comments
  has_many :order_items
  belongs_to :unit
  belongs_to :shop
end
