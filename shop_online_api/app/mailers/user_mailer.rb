class UserMailer < ApplicationMailer
  def email_confirmation(user)
    @user = user
    @user.update(confirm_send: Time.now)
    mail(to: user.email, subject: 'Welcome')
  end

  def email_resetPassword(user)
    @user = user
    mail(to: user.email, subject: 'Reset Password')
  end
end
