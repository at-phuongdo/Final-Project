json.extract! user, :id, :email, :password_digest, :firstname, :lastname, :phone, :address, :gender, :birthday, :avatar, :role, :confirm_token, :confirm_at, :confirm_send, :reset_password_token, :created_at, :updated_at
json.url user_url(user, format: :json)
