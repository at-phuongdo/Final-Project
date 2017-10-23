class Item < ApplicationRecord
  has_many :items_categories
  has_many :categorys, through: :items_categories
  belongs_to :unit
  belongs_to :shop

  def self.update_item(item_id, arr_item, arr_params)
    arr_item.each_with_index do |row, index|
      row.update(category_id: arr_params[index])
    end
    if arr_item.length < arr_params.length
      arr_params[arr_item.length..arr_params.length].each do |par|
        ItemsCategory.create(item_id: item_id, category_id: par)
      end
    elsif arr_item.length > arr_params.length
      arr_item[arr_params.length..arr_item.length].each do |row|
        row.destroy
      end
    end
  end
end
