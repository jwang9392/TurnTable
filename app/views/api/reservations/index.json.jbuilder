@reservations.each do |reservation|
    json.set! reservation.id do
        json.partial! 'api/reservations/reservation', reservation: reservation
        json.venue reservation.venue
        json.userId = reservation.user.id
    end
end

