class Api::V1::SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      if user.confirm_at
        confirm_token = SecureRandom.urlsafe_base64.to_s
        user.update(confirm_token: confirm_token)
        render json: { status: 200, message: 'Login complete!', auth_token: confirm_token }
      else
        render json: { status: 202, message: 'You must confirm email. Please check email to confirm!' }
      end
    else
      render json: { status: 302, message: 'Email or password invalid' }
    end
  end
end
