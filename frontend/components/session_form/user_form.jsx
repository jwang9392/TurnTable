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
  }

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
          {this.renderErrors()}
          <div className="signup-form">
            <br />
            <label>
              <input type="text"
                value={this.state.fname}
                placeholder='First Name *'
                onChange={this.update('fname')}
                className="modal-input"
              />
            </label>
            <br />
            <label>
              <input type="text"
                value={this.state.lname}
                placeholder='Last Name *'
                onChange={this.update('lname')}
                className="modal-input"
              />
            </label>
            <br />
            <label>
              <input type="text"
                value={this.state.email}
                placeholder='Enter email *'
                onChange={this.update('email')}
                className="modal-input"
              />
            </label>
            <br />
            <label>
              <input type="password"
                placeholder='Enter password *'
                value={this.state.password}
                onChange={this.update('password')}
                className="modal-input"
              />
            </label>
            <br />
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(UserForm);