export const fetchVenues = (searchParams) => {
  return $.ajax({
    method: "GET",
    url: "/api/venues",
    data: searchParams
  })
}

export const fetchVenue = id => {
  return $.ajax({
    method: "GET",
    url: `api/venues/${id}`
  })
}