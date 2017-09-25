class User < ApplicationRecord
  before_create :confirmation_token
  has_many :orders
  has_many :comments
  has_secure_password

  validates :email, uniqueness: true
  validates :email, :password_digest, presence: true
  # validates :firstname, :lastname, presence: true, except: create
  enum gender: %w[male female other]
  enum role: %w[member admin]

  def self.new_token
    SecureRandom.urlsafe_base64.to_s
  end

  def active_email?
    if confirm_send + 1.days >= Time.now
      update(confirm_at: Time.now)
    else
      new_email_token = User.new_token
      update(confirm_token: new_email_token)
      false
    end
  end

  def send_activation_email
    UserMailer.email_confirmation(self).deliver_now
  end

  def confirmation_token
    self.confirm_token = User.new_token
  end

  def reset_password
    reset_password = User.new_token
    update(reset_password_token: reset_password)
  end

  def send_reset_password_email
    UserMailer.email_resetPassword(self).deliver_now
  end

  def send_order(order, order_items)
    UserMailer.email_order(self, order, order_items).deliver_now
  end
end
