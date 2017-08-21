class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :status
      t.date :trans_at
      t.timestamps
    end
  end
end
