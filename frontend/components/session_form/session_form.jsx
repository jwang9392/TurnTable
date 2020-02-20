import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSubmit = this.demoSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors;
    
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  demoSubmit(e) {
    debugger
    e.preventDefault();
    const demoUser = {
      email: 'hello@world.com',
      password: 'helloworld'
    };
    this.props.processForm(demoUser).then(this.props.closeModal);
    debugger
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
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h2>Please sign in</h2>
          <hr/>
          {this.renderErrors()}
          <div className="login-form">
              <input type="text"
                value={this.state.email}
                placeholder='Email'
                onChange={this.update('email')}
                className="modal-input"
              />
              <br />
              <input type="password"
                value={this.state.password}
                placeholder='Password'
                onChange={this.update('password')}
                className="modal-input"
              />
            <br />
            <input className="session-submit" type="submit" value="Sign In" />
          </div>
          <hr/>
          <p>Don't want to complete the form?
            &nbsp;
            <input type="submit"
              value="Continue as Guest"
              onClick={this.demoSubmit}
              className="demo-login"
            />
          </p>
          <p>New to TurnTable?
            &nbsp;
            <button onClick={this.props.openModal}>Create an account</button>
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);