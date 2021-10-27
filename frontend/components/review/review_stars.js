import React from 'react';

class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
      hover: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    const { name, value } = e.currentTarget;

    this.setState({ rating: parseInt(value) });
    this.props.handleChange(e);
  }

  render() {
    const { rating, hover } = this.state;
    const { category, categoryVal } = this.props;

    return (
      <div className="star-group">
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                name={categoryVal}
                value={index}
                key={index}
                className={index <= (hover || rating) ? "rating-button on" : "rating-button off"}
                onClick={this.handleClick}
                onMouseEnter={() => this.setState({ hover: index })}
                onMouseLeave={() => this.setState({ hover: rating })}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      </div>
    )
  }
}

export default ReviewStars;