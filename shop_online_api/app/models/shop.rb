class Shop < ApplicationRecord
  has_and_belongs_to_many :supliers
  has_many :items
end
