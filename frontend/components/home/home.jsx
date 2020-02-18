import React from 'react';
import SearchContainer from '../search/search_container';
import { Link, withRouter } from 'react-router-dom';

const Home = () => (
  <>
    <SearchContainer />
    <div className="featured-areas">
      <div className="featured-areas-container">
        <h2 className="featured-areas-header">Featured Areas</h2>
        <div className="search-links-container">
          
        </div>
      </div>
    </div>
  </>
)

export default withRouter(Home);