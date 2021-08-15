import React from 'react';
import SearchContainer from '../search/search_form_container';
import Carousel from '../carousel/carousel';
import { Link, withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {empty: true, dance:[]};
  }

  componentDidMount() {
    if (this.isEmpty(this.props.venues)) {
      this.props.fetchVenues().then(() => {
        this.parseVenues();
        this.setState({empty: false});
      });
    } 
  }

  isEmpty(venues) {
    for (let venue in venues) {
      if (venues.hasOwnProperty(venue))
        return false;
    }

    return true;
  }

  parseVenues() {
    let categories = {
      dance: [], 
      jazz: [], 
      comedy: [], 
      low: [], 
      high: []
    };
    let venues = this.props.venues;

    for (let id in venues) {
      if (categories.dance.length < 11 && venues[id].genre === "Dance Clubs") {
        categories.dance.push(venues[id]);
      } else if (categories.jazz.length < 11 && venues[id].genre === "Jazz Clubs") {
        categories.jazz.push(venues[id]);
      } else if (categories.comedy.length < 11 && venues[id].genre === "Comedy Club") {
        categories.comedy.push(venues[id]);
      } else if (categories.low.length < 11 && venues[id].price === "$100 and under") {
        categories.low.push(venues[id]);
      } else if (categories.high.length < 11 && venues[id].price === "$401 and over") {
        categories.high.push(venues[id]);
      }
    }

    for (let cat in categories) {
      this.setState({
        [cat]: categories[cat]})
    }
  }

  createCarousel(category) {
    if (!this.state.empty) {
      return (
        <Carousel
          venues={this.state[category]}
        />
      )
    }
  }

  render() {
    return (
      <>
        <SearchContainer />
        <div className="home-body">
          <div>
            <h2 className="carousel-header">Dance Clubs</h2>
          </div>
          {this.createCarousel("dance")}
          <div>
            <h2 className="carousel-header">Jazz Clubs</h2>
          </div>
          {this.createCarousel("jazz")}
          <div>
            <h2 className="carousel-header">Comedy Clubs</h2>
          </div>
          {this.createCarousel("comedy")}
          <div>
            <h2 className="carousel-header">Easy on the wallet</h2>
          </div>
          {this.createCarousel("low")}
          <div>
            <h2 className="carousel-header">Premium Nightlife</h2>
          </div>
          {this.createCarousel("high")}
        </div>
      </>
    )
  }
}

export default withRouter(Home);