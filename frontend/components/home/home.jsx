import React from 'react';
import SearchContainer from '../search/search_form_container';
import Carousel from '../carousel/carousel';
import { Link, withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dance:[]};
  }

  componentDidMount() {
    this.props.fetchVenues().then(() => {
      this.parseVenues();
    });
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

  createCarousel(category, idx) {
    if (this.props.venues && Object.values(this.props.venues).length > 0) {
      return (
        <Carousel
          idx={idx}
          type={category}
          venues={this.state[category]}
        />
      )
    } else {
      return <div />
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
          {this.createCarousel("dance", 0)}
          <div>
            <h2 className="carousel-header">Jazz Clubs</h2>
          </div>
          {this.createCarousel("jazz", 1)}
          <div>
            <h2 className="carousel-header">Comedy Clubs</h2>
          </div>
          {this.createCarousel("comedy", 2)}
          <div>
            <h2 className="carousel-header">Easy on the wallet</h2>
          </div>
          {this.createCarousel("low", 3)}
          <div>
            <h2 className="carousel-header">Premium Nightlife</h2>
          </div>
          {this.createCarousel("high", 4)}
        </div>
      </>
    )
  }
}

export default withRouter(Home);