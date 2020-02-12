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
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    debugger
    this.props.processForm(user).then(() => this.props.closeModal);
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
          <br />
          {this.renderErrors()}
          <div className="login-form">
            <br />
            <label>
              <input type="text"
                value={this.state.email}
                placeholder='Email'
                onChange={this.update('email')}
                className="modal-input"
              />
            </label>
            <br />
            <label>
              <input type="password"
                value={this.state.password}
                placeholder='Password'
                onChange={this.update('password')}
                className="modal-input"
              />
            </label>
            <br />
            <input className="session-submit" type="submit" value="Sign In" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);