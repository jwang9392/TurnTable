json.partial! "api/reservations/reservation", reservation: @reservation
json.action action: @action
json.message ["Thanks! Your reservation is confirmed!", "Reservation updated!"]