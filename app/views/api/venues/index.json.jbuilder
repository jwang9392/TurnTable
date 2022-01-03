@venues.each do |venue|
  json.set! venue.id do
    json.partial! 'venue', venue: venue
    json.reservationsToday @res_today[venue.id] || 0
    json.review_average @review_average.select {|venue_reviews| venue_reviews.id == venue.id}
  end
end