import React from 'react';

class ReservationSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      toggled: false
    }

    this.update = this.update.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.toggledIcon = this.toggledIcon.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const user = {...this.props.user, password: this.state.password};

    this.props.signup(user).then((user) => {
      const res = {...this.props.reservation, user_id: user.currentUser.id};

      this.props.createReservation(res).then(data => {
        const resId = data.reservation.id;

        this.props.closeModal();
        this.props.history.replace({
          pathname: `/reservations/${resId}`,
          state: {
            past: []
          }
        })
      })
    });
  }

  update(e) {
    this.setState({
      password: e.target.value
    });
  }

  togglePassword() {
    if (this.state.toggled) {
      return "text";
    } else {
      return "password"
    }
  }

  changeIcon() {
    if (this.state.toggled) {
      this.setState({
        toggled: false
      })
    } else {
      this.setState({
        toggled: true
      })
    }
  }

  toggledIcon() {
    if (this.state.toggled) {
      return <i className="fas fa-eye-slash password-icon" onClick={this.changeIcon}></i>
    } else {
      return <i className="fas fa-eye password-icon" onClick={this.changeIcon}></i>
    }
  }

  render() {
    return (
      <div className="res-signup">
        <h2>Thanks, {this.props.user.fname}.</h2>
        <h4>A 8-character password is all you need to create an account.</h4>
        <div className="res-signup-password">
          <input 
            className="res-signup-input"
            type={this.togglePassword()}
            placeholder="Enter password *" 
            onChange={this.update}
          />
          {this.toggledIcon()}
        </div>
        <button className="submit-res-btn" onClick={this.handleOnClick}>Continue</button>
        <p>By clicking "Continue" you agree to the terms and conditions of the TurnTable User Agreement and Privacy Policy.</p>
      </div>
    )
  }
}

export default ReservationSignup;