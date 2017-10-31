class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.string :status
      t.references :order, index: true
      t.timestamps
    end
  end
end
