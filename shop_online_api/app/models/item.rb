class Item < ApplicationRecord
  has_many :items_categories
  has_many :categorys, through: :items_categories
  has_many :images_items
  has_many :comments
  has_many :order_items
  belongs_to :unit
  belongs_to :shop

  def list_product_by_category
    item_cate = ItemsCategory.where(category_id: @id_cate)
    if item_cate
      @id_item = item_cate.map(&:item_id)
      @item_by_category = Item.find(@id_item)
    else
      @id_item_by_category = []
    end
  end
end
