@venues.each do |venue|
  json.set! venue.id do
    json.partial! 'venue', venue: venue
    json.reservationsToday venue.reservation_count
  end
end