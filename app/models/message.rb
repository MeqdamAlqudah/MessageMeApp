class Message < ApplicationRecord
  belongs_to :user
  validates :body, presence: true, length: { maximum: 500 }
  validates :user_id, presence: true
end
