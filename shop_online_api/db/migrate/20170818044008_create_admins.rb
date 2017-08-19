class CreateAdmins < ActiveRecord::Migration[5.1]
  def change
    create_table :admins do |t|
      t.integer :role
      t.string :username
      t.string :password
      t.string :email
      t.timestamps
    end
  end
end
