class SessionsController < ApplicationController
  def new
    binding.pry
    redirect_to users_path if current_user
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      if user.role == 1
        log_in user
        redirect_to users_path
      else
        flash[:danger] = 'You don\'t have role'
        render :new
      end
    else
      # Create an error message.
      flash[:danger] = 'Invalid email/password combination'
      render :new
    end
  end

  def destroy
    log_out
    redirect_to login_url
  end
end
