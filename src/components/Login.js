import React, { Component } from 'react';
import { clearAuthState, login } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Signup.css';
class Login extends Component {
  constructor(props) {
    super(props);
    //  this.emailInputRef=React.createRef();
    //  this.passwordInputRef=React.createRef();
    this.state = {
      email: '',
      password: ''
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    if (localStorage.getItem('token')) {
      return <Redirect to="/events" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging In..
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}>Log In</button>
          )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(Login);
