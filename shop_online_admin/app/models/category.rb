class Category < ApplicationRecord
  has_many :items_categories
  has_many :items, through: :items_categories
end
