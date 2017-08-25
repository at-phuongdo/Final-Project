class CreateOrderItems < ActiveRecord::Migration[5.1]
  def change
    create_table :order_items do |t|
      t.float :price
      t.integer :quantity
      t.references :item, index: true
      t.references :order, index: true
      t.timestamps
    end
  end
end
