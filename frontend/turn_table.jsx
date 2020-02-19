import React from 'react';
import ReactDOM from 'react-dom';
import {fetchReservation, fetchReservations, createReservation, updateReservation, removeReservation} from './util/reservation_api_util';
import configureStore from './store/store';
import Root from './components/root'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.fetchReservation = fetchReservation;
  window.fetchReservations = fetchReservations;
  window.createReservation = createReservation;
  window.updateReservation = updateReservation;
  window.removeReservation = removeReservation;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store}/> , root)
})