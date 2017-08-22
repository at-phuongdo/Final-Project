class UserMailer < ApplicationMailer
  def confirm_email(user)
    @user = user
    @user.update(confirm_send: Time.now)
    mail(to: user.email, subject: 'Welcome')
  end
end
