class Shop < ApplicationRecord
  has_and_belongs_to_many :admins
  has_many :items
end
