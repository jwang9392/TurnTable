import React from "react";

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: false,
      updated: false,
      user: props.user,
      fname: props.user.fname,
      lname: props.user.lname,
      username: props.user.username,
      email: props.user.email, 
      phone_number: props.user.phone_number,
      new_password: "", 
      check_password: "",
      inputErrors: {
        fname: false,
        lname: false,
        username: false,
        email: false,
        phone_number: false,
        new_password: false, 
        check_password: false
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.closeBanner = this.closeBanner.bind(this);
  }

  errorMessage(type) {
    const val = {
      "fname": "First name",
      "lname": "Last name",
      "phone_number": "Phone number",
      "email": "Email"
    };

    if (type === "username") {
      return "Your review display name must be between 4 and 25 characters in length and only use letters and numbers."
    } else if (this.state[type] === "" && type != "new_password" && type != "check_password") {
      return val[type].concat(" is required.");
    } else if (type === "email" && !this.validateEmail(this.state[type])) {
      return "Please enter a valid email address."
    } else if (type === "new_password") {
      return "Please choose a password that is at least 6 characters long."
    } else if (type === "check_password") {
      return "Passwords do not match."
    }
  }

  validateEmail(inputText) {
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    };
  }

  validateUsername(username) {
    return /^(?=.{4})[a-z]([_]?[a-z\d]+)*$/i.test(username);
  }

  update(e) {
    let field = e.target.name;
    const val = e.target.value;
    this.setState({
      [field]: val
    });

    if (field === "username" && !this.validateUsername(val)) {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: true
        }
      });
    } else if (field != "new_password" && field != "check_password" && val.length === 0) {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: true
        }
      });
    } else if (field === "email" && !this.validateEmail(val)) {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: true
        }
      });
    } else if (field === "new_password" && val.length < 6) {
      if (this.state.check_password.length === 0 && val.length === 0) {
        this.setState({
          inputErrors: {
            ...this.state.inputErrors,
            [field]: false, 
            ["check_password"]: false
          }
        });
      } else if (this.state.check_password != val) {
        this.setState({
          inputErrors: {
            ...this.state.inputErrors,
            [field]: true, 
            ["check_password"]: true
          }
        });
      } else if (this.state.check_password === val) {
        this.setState({
          inputErrors: {
            ...this.state.inputErrors,
            [field]: true,
            ["check_password"]: false
          }
        });
      }
    } else if (field === "new_password" && val.length >= 6) {
      if (this.state.check_password != val) {
        this.setState({
          inputErrors: {
            ...this.state.inputErrors,
            [field]: false,
            ["check_password"]: true
          }
        });
      } else if (this.state.check_password === val) {
        this.setState({
          inputErrors: {
            ...this.state.inputErrors,
            [field]: false,
            ["check_password"]: false
          }
        });
      }
    } else if (field === "check_password" && this.state.new_password != val) {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: true
        }
      });
    } else if (field === "check_password" && this.state.new_password === "" && val === "") {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: false, 
          ["new_password"]: false
        }
      });
    } else {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: false
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, username, email, phone_number, new_password, check_password } = this.state;

    if (Object.values(this.state.inputErrors).includes(true)) return;
    let user = {
      ...this.props.user,
      fname: fname, 
      lname: lname,
      username: username,
      email: email,
      phone_number: phone_number
    };

    if (new_password.length > 0 && new_password === check_password) {
      user = Object.assign(user, {
        password: new_password
      });
    }

    this.props.updateUser(user).then(() => {
      this.setState({updated: true});
      window.scrollTo(0, 0);
    });
  }

  closeBanner = () => {
    this.setState({updated: false});
  }

  render() {
    let {fname, lname, username, email, phone_number, new_password, check_password, inputErrors} = this.state;

    return (
      <div className="user-update-container">
        <div className={this.state.updated ? "user-update-banner" : "hidden"}>
          <div>
            <i className="fas fa-check-circle"></i>
            <p>Your changes are saved</p>
          </div>
          <div className="close-btn" onClick={this.closeBanner}></div>
        </div>
        <form onSubmit={this.handleSubmit} className="user-update-form">
          <h2>About me</h2>
          <div className="user-update-name">
            <div>
              <label className="update-input-container">
                First name
                <input 
                  name="fname"
                  type="text"
                  defaultValue={fname}
                  placeholder='First name'
                  onChange={this.update}
                  className={`user-update-input input-short ${inputErrors.fname ? "update-input-error" : ""}`}
                />
              </label>
              <div className={`input-error-message ${
                  inputErrors.fname ? "" : "hidden"
                }`}>{this.errorMessage("fname")}</div>
            </div>
            <div>
              <label className="update-input-container">
                Last name
                <input 
                  name="lname"
                  type="text"
                  defaultValue={lname}
                  placeholder='Last name'
                  onChange={this.update}
                  className={`user-update-input input-short ${inputErrors.lname ? "update-input-error" : ""}`}
                />
              </label>
              <div className={`input-error-message ${
                inputErrors.lname ? "" : "hidden"
              }`}>{this.errorMessage("lname")}</div>
            </div>
          </div>
          <label className="update-input-container">
            Review display name
            <input
              name="username"
              type="text"
              defaultValue={username}
              placeholder='Review display name'
              onChange={this.update}
              className={`user-update-input input-long ${inputErrors.username ? "update-input-error" : ""}`}
            />
          </label>
          <div className={`input-error-message ${inputErrors.username ? "" : "hidden"
            }`}>{this.errorMessage("username")}</div>
          <label className="update-input-container">
            Email address
            <input 
              name="email"
              type="text"
              defaultValue={email}
              placeholder='Email address'
              onChange={this.update}
              className={`user-update-input input-long ${inputErrors.email ? "update-input-error" : ""}`}
            />
          </label>
          <div className={`input-error-message ${
            inputErrors.email ? "" : "hidden"
          }`}>{this.errorMessage("email")}</div>
          <label className="update-input-container">
            Phone
            <input 
              name="phone_number"
              type="text"
              defaultValue={phone_number}
              placeholder='Phone'
              onChange={this.update}
              className={`user-update-input input-long ${inputErrors.phone_number ? "update-input-error" : ""}`}
            />
          </label>
          <div className={`input-error-message ${
            inputErrors.phone_number ? "" : "hidden"
          }`}>{this.errorMessage("phone_number")}</div>

          <h2>Change password</h2>
          <label className="update-input-container">
            New password
            <input 
              name="new_password"
              type="password"
              defaultValue={new_password}
              placeholder='Enter password'
              onChange={this.update}
              className={`user-update-input input-short ${inputErrors.new_password ? "update-input-error" : ""}`}
            />
          </label>
          <div className={`input-error-message ${
            inputErrors.new_password ? "" : "hidden"
          }`}>{this.errorMessage("new_password")}</div>
          <label className="update-input-container">
            Confirm new password
            <input 
              name="check_password"
              type="password"
              defaultValue={check_password}
              placeholder='Re-enter password'
              onChange={this.update}
              className={`user-update-input input-short ${inputErrors.check_password ? "update-input-error" : ""}`}
            />
          </label>
          <div className={`input-error-message ${
            inputErrors.check_password ? "" : "hidden"
          }`}>{this.errorMessage("check_password")}</div>
          <button className="update-submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default UserUpdate;