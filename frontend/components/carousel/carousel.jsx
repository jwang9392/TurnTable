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
      clicked: false,
      isMobile: false

    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    if (document.getElementsByClassName('carousel-content-wrapper')[this.props.idx]) {
      this.setState({ carouselWidth: document.getElementsByClassName('carousel-content-wrapper')[this.props.idx].getBoundingClientRect().width})
    }

    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < 680
      });
    }, false);
  }

  componentWillUnmount() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < 680
      });
    }, false);
  }
  
  handleResize = e => {
    if (document.getElementsByClassName('carousel-content-wrapper')[this.props.idx]) {
      this.setState({ carouselWidth: document.getElementsByClassName('carousel-content-wrapper')[this.props.idx].getBoundingClientRect().width })
    }
  };

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
      let newIdx = currentIndex;
      let container = document.getElementsByClassName('carousel-content-wrapper')[this.props.idx].getBoundingClientRect();
      let fullContainer = document.getElementsByClassName('carousel-content')[this.props.idx].getBoundingClientRect();
      let carouselEndPos = document.getElementById(`${this.props.type}-carousel-10`).getBoundingClientRect().right;

      while (!lastShowing) {
        const itemLoc = document.getElementById(`${this.props.type}-carousel-${newIdx}`).getBoundingClientRect();
        if (itemLoc.right + 16 >= container.right && itemLoc.left < container.right) {
          lastShowing = true;
          if (carouselEndPos - itemLoc.left + container.left < itemLoc.right) {
            this.setState({ 
              currentIndex: newIdx, 
              position: carouselEndPos - fullContainer.right + 6, 
              end: true
            })
          } else {
            this.setState({
              currentIndex: newIdx, 
              position: position + itemLoc.left - container.left,
              start: false
            })
          }
        }
  
        newIdx++;
      }

      setTimeout(() => {
        this.setState({ clicked: false });
      }, 400);
    }
  }

  prev() {
    const { currentIndex, position, end, clicked } = this.state;
    if (!clicked) {
      this.setState({ clicked: true });
      let firstShowing;
      let newIdx = currentIndex;
      let container = document.getElementsByClassName('carousel-content-wrapper')[this.props.idx].getBoundingClientRect();

      while (!firstShowing) {
        const itemLoc = document.getElementById(`${this.props.type}-carousel-${newIdx}`).getBoundingClientRect();

        if (itemLoc.left - 16 <= container.left && itemLoc.right > container.left) {
          firstShowing = true;
          if (container.width >= position) {
            this.setState({
              currentIndex: 0,
              position: 0,
              start: true
            })
          } else if (end) {
            let diff = itemLoc.left < 1 ? itemLoc.width + itemLoc.right - container.left + 16 : itemLoc.width
            this.setState({
              currentIndex: newIdx - 1,
              position: position + diff - container.width + (itemLoc.left - container.left),
              end: false
            })
          } else {
            let endDiff = container.width - Math.floor(container.width / 246) * 246;
            this.setState({
              currentIndex: newIdx,
              position: position + endDiff + itemLoc.left - container.right,
              end: false
            })
          }
        }
  
        newIdx--;
      }

      setTimeout(() => {
        this.setState({ clicked: false });
      }, 400);
    }
  }

  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {
            (!this.state.start && !this.state.isMobile) &&
            <button onClick={this.prev} className="custom-arrow-left">
              <i id="chevron-left" className="fas fa-chevron-left"></i>
            </button>
          }
          <div className={this.state.isMobile ? "carousel-content-wrapper carousel-scroll" : "carousel-content-wrapper carousel-unscroll"}>
            <div className="carousel-content" style={{ transform: `translateX(-${this.state.position}px)`}}>
                {this.createCarouselItems(this.props.venues)}
            </div>
          </div>
          {
            (!this.state.end && !this.state.isMobile) &&
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