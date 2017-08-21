class CreateItemsCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :items_categories do |t|
      t.timestamps
    end
  end
end
