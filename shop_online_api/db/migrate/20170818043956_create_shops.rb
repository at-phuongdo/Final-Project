class CreateShops < ActiveRecord::Migration[5.1]
  def change
    create_table :shops do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :email
      t.string :type
      t.timestamps
    end
  end
end
