class Order < ApplicationRecord
  has_many :order_items
  has_one :payment
  belongs_to :user

  def reateOrder data_orders
    
    order = Order.new()
  end
end
