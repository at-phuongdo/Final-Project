class Order < ApplicationRecord
  has_many :order_items
  has_one :payment
  belongs_to :user, optional: true
end
