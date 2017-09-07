class Item < ApplicationRecord
  has_many :items_categories
  has_many :categorys, through: :items_categories
  has_many :images_items
  has_many :comments
  has_many :order_items
  belongs_to :unit
  belongs_to :shop

  def self.sort(order, dir, items)
    str = ActiveRecord::Base.send(:sanitize_sql_for_order, "#{order} #{dir}")
    items.order(str)
  end
end
