export const fetchVenues = () => {
  return $.ajax({
    method: "GET",
    url: "/api/venues"
    // data: searchParams
  })
}

export const fetchVenue = venueId => {
  return $.ajax({
    method: "GET",
    url: `api/venues/${venueId}`
  })
}