class User < ApplicationRecord
  before_create :confirmation_token
  has_many :orders
  has_many :comments
  has_secure_password

  validates :email, uniqueness: true
  validates :email, :password_digest, presence: true, on: :create
  # validates :firstname, :lastname, presence: true, except: create
  enum gender: %w[male female other]
  enum role: %w[member admin]

  def self.new_token
    SecureRandom.urlsafe_base64.to_s
  end

  def is_email_activate?
    if confirm_send + 2.days >= Time.now
      update(confirm_at: Time.now)
      true
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
end
