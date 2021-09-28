@venues.each do |venue|
  json.set! venue.id do
    json.partial! 'venue', venue: venue
    json.reservationsToday @res_today[venue.id] || 0
  end
end