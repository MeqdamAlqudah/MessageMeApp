class Message < ApplicationRecord
  belongs_to :user
  validates :body, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 500 }
end
