class CreateItemsCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :items_categories do |t|
      t.references :item, index: true
      t.references :category, index: true
      t.timestamps
    end
  end
end
