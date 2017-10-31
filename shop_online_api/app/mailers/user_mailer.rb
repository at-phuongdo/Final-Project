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

  def email_order(user, order, order_items, sum)
    @user = user
    @order = order
    @order_items = order_items
    @sum = sum
    mail(to: user.email, subject: 'Your order')
  end
end
