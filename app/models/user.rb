class User < ApplicationRecord
  has_secure_password
  has_many :messages
  has_many :channels
  before_save { self.email = email.downcase }

  validates :email,
            uniqueness: { case_sensitive: false },
            presence: true, length: { maximum: 80 },
            format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  validates :username,
            uniqueness: { case_sensitive: false },
            presence: true, length: { maximum: 50 }
  validates :password, length: { minimum: 8 },
                       format: { with: ~/\w/ }
end
