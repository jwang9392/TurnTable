export const fetchVenues = data => {
  return $.ajax({
    method: "GET",
    url: "/api/venues",
    data
  })
}

export const fetchVenue = venueId => {
  return $.ajax({
    method: "GET",
    url: `api/venues/${venueId}`
  })
}

export const searchVenues = (searchParams) => {
  return $.ajax({
    method: "GET",
    url: "/api/search",
    data: { searchParams }
  });
}