import * as ApiUtil from '../util/reservation_api_util';

export const RECEIVE_RESERVATIONS = "RECEIVE_RESERVATIONS";
export const RECEIVE_RESERVATION = "RECEIVE_RESERVATION";
export const REMOVE_RESERVATION = "REMOVE_RESERVATION";
export const RECEIVE_RESERVATION_ERRORS = 'RECEIVE_RESERVATION_ERRORS';

const receiveReservations = reservations => ({
  type: RECEIVE_RESERVATIONS,
  reservations
})

const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation
})

const removeReservation = resId => ({
  type: REMOVE_RESERVATION,
  resId
})

const receiveErrors = errors => ({
  type: RECEIVE_RESERVATION_ERRORS,
  errors
})

export const fetchReservations = (userId=0) => dispatch => (
  ApiUtil.fetchReservations(userId).then(
    reservations => dispatch(receiveReservations(reservations)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const fetchReservation = resId => dispatch => (
  ApiUtil.fetchReservation(resId).then(
    reservation => dispatch(receiveReservation(reservation)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const createReservation = reservation => dispatch => (
  ApiUtil.createReservation(reservation).then(
    reservation => dispatch(receiveReservation(reservation)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const updateReservation = reservation => dispatch => (
  ApiUtil.updateReservation(reservation).then(
    reservation => dispatch(receiveReservation(reservation)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const deleteReservation = resId => dispatch => (
  ApiUtil.removeReservation(resId).then(
    reservation => dispatch(removeReservation(reservation.id)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)