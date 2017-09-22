json.extract! order, :id, :name, :address, :phone, :status, :trans_at, :user_id, :created_at, :updated_at
json.url order_url(order, format: :json)
