import React from 'react';
import CarouselItem from './carousel_item';

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0, 
      length: this.props.venues.length
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  createCarouselItems(venues) {
    let venueLis = venues.map(venue => {
      return (
        <CarouselItem
          key={venue.id}
          venue={venue}
        />
      )
    })
    
    return venueLis;
  }

  next() {
    if (this.state.currentIndex < (this.state.length - 4)) {
      let newIdx = this.state.currentIndex + 4;
      this.setState({currentIndex: newIdx})
    }
  }

  prev() {
    if (this.state.currentIndex > 0) {
      let newIdx = this.state.currentIndex - 4;
      this.setState({ currentIndex: newIdx })
    }
  }


  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {
            this.state.currentIndex > 0 &&
            <button onClick={this.prev} className="custom-arrow-left">
              <i id="chevron-left" className="fas fa-chevron-left"></i>
            </button>
          }
          <div className="carousel-content-wrapper">
            <div className="carousel-content" style={{ transform: `translateX(-${this.state.currentIndex * 20}%)` }}>
                {this.createCarouselItems(this.props.venues)}
            </div>
          </div>
          {
            this.state.currentIndex < (this.state.length - 4) &&
            <button onClick={this.next} className="custom-arrow-right">
              <i id="chevron-right" className="fas fa-chevron-right"></i>
            </button>
          }
        </div>
      </div>
    )
  }
}

export default Carousel;