class Order < ApplicationRecord
  has_many :order_items
  has_one :payment
  belongs_to :user

  def self.get_all_product_in_order order
    list_product = []
    for i in order
      list_product.push(i.order_items)
      list_product.flatten!
    end
    list_product
  end
end
