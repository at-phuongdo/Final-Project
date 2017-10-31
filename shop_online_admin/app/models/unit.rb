class Unit < ApplicationRecord
  has_many :items
  validates :syntax, uniqueness: true
end
