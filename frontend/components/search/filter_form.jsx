import React from 'react';

class FilterForm extends React.Component {

  constructor(props) {
    super(props);
    this.filters = props.filters;
    this.state = {
      priceToggle1: false, 
      priceToggle2: false, 
      priceToggle3: false
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
              <label>
                <input
                  type="checkbox"
                  value={val}
                  onChange={this.handleChange(type, val)}
                />
                {val}
              </label>
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

  render() {
    return (
      <div className="filter">
        <span>Filter results:</span>
        <br />
        <div>
          <span>City</span>
          <ul>
            {this.createFilterList("City")}
          </ul>
        </div>
        <div>
          <span>Price</span>
          <ul>
            {this.createFilterList("Price")}
          </ul>
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
