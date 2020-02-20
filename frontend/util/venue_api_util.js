export const fetchVenues = () => {
  return $.ajax({
    method: "GET",
    url: "/api/venues"
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