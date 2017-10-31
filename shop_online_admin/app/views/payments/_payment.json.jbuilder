json.extract! payment, :id, :status, :order_id, :created_at, :updated_at
json.url payment_url(payment, format: :json)
