@venues.each do |venue|
  json.set! venue.id do
    json.partial! 'venue', venue: venue
  end

end