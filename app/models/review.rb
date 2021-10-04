class Review < ApplicationRecord
  validates :music_rating, :service_rating, :ambience_rating, presence: true, inclusion: { in: (1..5) }
  validates :review_body, presence: true
  
  belongs_to :venue
  belongs_to :user
end