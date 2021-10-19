import React from 'react';
import { withRouter } from 'react-router-dom';
import ReviewStep1 from './review_step_1'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_step: 1, 
      overall_rating: 0,
      music_rating: 0, 
      service_rating: 0, 
      ambience_rating: 0, 
      review_body: ""
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    e.preventDefault();
    
    const { name, value, type } = e.currentTarget;
    this.setState({
      [name]: type === 'button' ? parseInt(value) : value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    
    return (
      <form onSubmit={this.handleSubmit}>
        <ReviewStep1
          current_step={this.state.current_step}
          handleChange={this.handleChange}
          email={this.state.email}
        />
        {/* <Step2
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          username={this.state.username}
        />
        <Step3
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          password={this.state.password}
        /> */}
      </form>
    );
  }
}

export default withRouter(ReviewForm);