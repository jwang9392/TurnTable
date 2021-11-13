import React from 'react';
import CarouselItem from './carousel_item';

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      position: 0, 
      start: true,
      end: false, 
      clicked: false
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  createCarouselItems(venues) {
    if (venues && venues.length > 0) {
      return (
        venues.map((venue, i) => {
          return (
            <CarouselItem
              key={venue.id}
              venue={venue}
              idx={i}
              type={this.props.type}
            />
          )
        })
      )
    } else {
      return (
        <div />
      )
    }
  }

  next() {
    const { currentIndex, position, clicked } = this.state;
    
    if (!clicked) {
      this.setState({clicked: true});

      let lastShowing;
      let newIdx = currentIndex + 1;
      let container = document.getElementsByClassName('carousel-content-wrapper')[0].getBoundingClientRect();
      let carouselEndPos = document.getElementById(`${this.props.type}-carousel-10`).getBoundingClientRect().right;

      while (!lastShowing) {
        const itemLoc = document.getElementById(`${this.props.type}-carousel-${newIdx}`).getBoundingClientRect();
        
        if (itemLoc.left > container.right || itemLoc.right > container.right && itemLoc.left < container.right) {
          lastShowing = itemLoc;
          if ((container.width + position) > carouselEndPos) {
            let newPos = position + (carouselEndPos - container.width - container.left);
            this.setState({ 
              currentIndex: newIdx, 
              position: newPos, 
              end: true
            })
          } else {
            this.setState({
              currentIndex: newIdx, 
              position: (position + itemLoc.left - container.left),
              start: false
            })
          }
        }
  
        newIdx++;
      }

      setTimeout(() => {
        this.setState({ clicked: false });
      }, 500);
    }
  }

  prev() {
    const { currentIndex, position, end } = this.state;

    if (!clicked) {
      this.setState({ clicked: true });

      let firstShowing;
      let newIdx = currentIndex;
      let container = document.getElementsByClassName('carousel-content-wrapper')[0].getBoundingClientRect();
  
      while (!firstShowing) {
        const itemLoc = document.getElementById(`${this.props.type}-carousel-${newIdx}`).getBoundingClientRect();
  
        if (itemLoc.right < container.left || itemLoc.right > container.left && itemLoc.left < container.left) {
          firstShowing = itemLoc;
          if (container.width > position) {
            this.setState({
              currentIndex: newIdx,
              position: 0,
              start: true
            })
          } else if (end) {
            this.setState({
              currentIndex: newIdx,
              position: (position + itemLoc.right - container.width),
              end: false
            })
          } else {
            this.setState({
              currentIndex: newIdx,
              position: (position + container.left - container.width),
              end: false
            })
          }
        }
  
        newIdx--;
      }

      setTimeout(() => {
        this.setState({ clicked: false });
      }, 500);
    }
  }

  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {
            !this.state.start &&
            <button onClick={this.prev} className="custom-arrow-left">
              <i id="chevron-left" className="fas fa-chevron-left"></i>
            </button>
          }
          <div className="carousel-content-wrapper">
            <div className="carousel-content" style={{ transform: `translateX(-${this.state.position}px)` }}>
                {this.createCarouselItems(this.props.venues)}
            </div>
          </div>
          {
            !this.state.end &&
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