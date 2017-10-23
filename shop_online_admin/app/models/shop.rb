class Shop < ApplicationRecord
  has_many :supliers
  has_many :items
end
