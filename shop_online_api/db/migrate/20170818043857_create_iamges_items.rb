class CreateIamgesItems < ActiveRecord::Migration[5.1]
  def change
    create_table :iamges_items do |t|
      t.string :image
      t.timestamps
    end
  end
end
