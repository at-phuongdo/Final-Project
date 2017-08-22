class Api::V1::ConfirmationsController < ApplicationController
  def confirm_email
    user = User.find_by_confirm_token(params[:id])
    if user
      user.email_activate
      if user.confirm_at
        redirect_to 'http://localhost:4200/login'
      else
        user.send_activation_email
      end
    else
      redirect_to 'http://localhost:4200/register'
    end
  end
end
