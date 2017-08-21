class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price
      t.string :avatar
      t.string :status
      t.integer :quantity
      t.timestamps
    end
  end
end
