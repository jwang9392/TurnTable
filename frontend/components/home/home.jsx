import React from 'react';
import SearchContainer from '../search/search_form_container';
import { Link, withRouter } from 'react-router-dom';

const Home = () => (
  <>
    <SearchContainer />

        <div>
          <button className="custom-arrow">
            <i id="chevron-right" className="fas fa-chevron-right"></i>
          </button>
        </div>

  </>
)

export default withRouter(Home);