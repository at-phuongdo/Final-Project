class SessionsController < ApplicationController
  layout false
  def new
    redirect_to users_path if current_user
    render layout: false
  end

  def create
    if params[:session][:email] || params[:session][:password]
      user = User.find_by(email: params[:session][:email])
      if user && user.authenticate(params[:session][:password])
        if user.role == 'admin'
          log_in user
          redirect_to users_path
        else
          flash[:danger] = 'You don\'t have role'
          render :new
        end
      else
        flash[:danger] = 'Invalid email/password combination'
        render :new
      end
    else
      flash[:danger] = 'Email or Password blank'
      render :new
    end
  end

  def destroy
    log_out
    redirect_to login_url
  end
end
