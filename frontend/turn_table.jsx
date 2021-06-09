import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root'
import removeReservation from './util/reservation_api_util'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = { 
      entities: {
        users: { [window.currentUser.id]: window.currentUser }, 
        // reservations: currentUser.reservations,
        // venues: currentUser.venues
      },
      session: { currentUserId: window.currentUser.id }, 
      ui: {
        filter: {
          'City': [],
          'Price': [],
          'Genre': []
        }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    const preloadedState = {
      ui: {
        filter: {
          'City': [],
          'Price': [],
          'Genre': []
        }
      }
    };
    store = configureStore(preloadedState);
  }

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store}/> , root)
})