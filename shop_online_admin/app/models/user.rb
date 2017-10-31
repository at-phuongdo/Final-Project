class User < ApplicationRecord
  has_many :orders
  has_many :comments
  # validates_confirmation_of :password
  has_secure_password
  validates :email, uniqueness: true, presence: true
  validates :firstname, :lastname, presence: true
  # validates :password, confirmation: true
  enum gender: %w[female male other]
  enum role: %w[member admin root_admin]
end
