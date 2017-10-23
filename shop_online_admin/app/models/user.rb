class User < ApplicationRecord
  has_many :orders
  has_many :comments
  # validates_confirmation_of :password
  validates :email, uniqueness: true, presence: true
  # validates :password, confirmation: true
  enum gender: %w[female male other]
  enum role: %w[member admin]
  has_secure_password
end
