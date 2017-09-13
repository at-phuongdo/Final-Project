class Order < ApplicationRecord
  has_many :order_items
  has_one :payment
  belongs_to :user

  def self.paging page, per_page
    limit(per_page).offset((page - 1) * per_page)
  end
end
