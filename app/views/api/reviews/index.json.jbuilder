@reviews.each do |review|
  if @param == "user"
    json.set! review.venue_id do
        json.partial! 'review', review: review
    end
  else 
    json.set! review.id do
        json.partial! 'review', review: review
    end
  end
end
