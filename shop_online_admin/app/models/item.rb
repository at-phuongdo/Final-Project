class Item < ApplicationRecord
  belongs_to :unit
  belongs_to :shop
end
