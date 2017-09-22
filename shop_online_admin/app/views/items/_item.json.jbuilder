json.extract! item, :id, :name, :price, :avatar, :status, :quantity, :description, :unit_id, :shop_id, :created_at, :updated_at
json.url item_url(item, format: :json)
