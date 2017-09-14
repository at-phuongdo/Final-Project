class CreateSupliers < ActiveRecord::Migration[5.1]
  def change
    create_table :supliers do |t|
      t.string :username
      t.string :password
      t.string :email
      t.references :parent, index: true
      t.references :shop, index: true
      t.timestamps
    end
  end
end
