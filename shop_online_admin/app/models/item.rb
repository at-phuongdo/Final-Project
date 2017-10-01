class Item < ApplicationRecord
  has_many :items_categories
  has_many :categorys, through: :items_categories
  belongs_to :unit
  belongs_to :shop
end
