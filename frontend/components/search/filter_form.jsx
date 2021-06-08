import React from 'react';

class FilterForm extends React.Component {

  constructor(props) {
    super(props);
    this.filters = props.filters;
    this.state = {
      price1: false, 
      price2: false, 
      price3: false
    };
    this.createFilterList = this.createFilterList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createFilterList = (type) => {
    return (
      this.filters[type].map((val, i) => {
        return (
          <li key={i}>
            <div>
              <input
                type="checkbox"
                value={val}
                onChange={this.handleChange(type, val)}
              />
              <label>{val}</label>
              <br />
            </div>
          </li>
        )
      })
    )
  }

  handleChange = (filter, value) => e => {
    if (e.target.checked === true) {
      return this.props.updateFilter(filter, value)
    } else {
      return this.props.deleteFilter(filter, value)
    }
  };

  // handleClick = () => e => {
    
  // };

  render() {
    return (
      <div>
        <span className="filter">Filter results:</span>
        <br />
        <div>
          <span>City</span>
          <ul>
            {this.createFilterList("City")}
          </ul>
        </div>
        <div>
          <span>Price</span>
          <div>
            <button>$</button>
            <button>$$</button>
            <button>$$$</button>
          </div>
        </div>
        <div>
          <span>Genre</span>
          <ul>
            {this.createFilterList("Genre")}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterForm;
