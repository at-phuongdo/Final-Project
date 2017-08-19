class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.string :full_name
      t.string :phone
      t.string :address
      t.integer :gender
      t.date :birthday
      t.string :avatar
      t.timestamps
    end
  end
end
