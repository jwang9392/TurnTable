import React from 'react';
import { withRouter } from 'react-router-dom';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSubmit = this.demoSubmit.bind(this);
  }

  // componentDidMount() {
  //   this.props.clearErrors;
  // }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state, { username: `${[this.state.fname]} ${[this.state.lname]}` });
    this.props.processForm(user).then(this.props.closeModal);
  }

  demoSubmit(e) {
    e.preventDefault();
    const demoUser = {
      email: 'hello@world.com',
      password: 'helloworld'
    };
    this.props.loginDemo(demoUser).then(this.props.closeModal);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit} className="signup-form-box">
          <br />
          <h2>Welcome to TurnTable!</h2>
          <hr />
          {this.renderErrors()}
          <div className="signup-form">
            <br />
            <input type="text"
              value={this.state.fname}
              placeholder='First Name *'
              onChange={this.update('fname')}
              className="modal-input"
            />
            <br />
            <input type="text"
              value={this.state.lname}
              placeholder='Last Name *'
              onChange={this.update('lname')}
              className="modal-input"
            />
            <br />            
            <input type="text"
              value={this.state.email}
              placeholder='Enter email *'
              onChange={this.update('email')}
              className="modal-input"
            />
            <br />            
            <input type="password"
              placeholder='Enter password *'
              value={this.state.password}
              onChange={this.update('password')}
              className="modal-input"
            />
            <br />
            <input className="session-submit" type="submit" value="Sign Up" />
          </div>
        <hr />
        </form>
        <p>Don't want to complete the form?
            &nbsp;
            <input type="submit"
            value="Continue as Guest"
            onClick={this.demoSubmit}
            className="demo-login"
          />
        </p>
        <span>By creating an account you agree to the TurnTable Terms of Use and Privacy Policy.</span>
      </div>
    );
  }
}

export default withRouter(UserForm);