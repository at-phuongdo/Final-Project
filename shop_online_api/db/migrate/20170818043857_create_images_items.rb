class CreateImagesItems < ActiveRecord::Migration[5.1]
  def change
    create_table :images_items do |t|
      t.string :image
      t.references :item, index: true
      t.timestamps
    end
  end
end
