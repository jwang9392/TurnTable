export const fetchReservations = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}/reservations`,
    data: {userId}
  })
}

export const fetchReservation = resId => {
  return $.ajax({
    method: "GET",
    url: `/api/reservations/${resId}`,
    data: { resId }
  })
}

export const createReservation = reservation => {
  return $.ajax({
    method: "POST",
    url: `/api/venues/${reservation.venue_id}/reservations`,
    data: { reservation }
  })
}

export const updateReservation = reservation => {
  return $.ajax({
    method: "PATCH",
    url: `/api/reservations/${reservation.id}`,
    data: { reservation }
  })
}

export const removeReservation = resId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/reservations/${resId}`
  })
}