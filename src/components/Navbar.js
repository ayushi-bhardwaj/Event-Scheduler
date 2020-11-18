import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import './Navbar.css';

class Navbar extends Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser);
    window.location.reload(false);
  };
  render() {
    const { auth } = this.props;

    return (
      <div>
        <header class="header">
          <h1 class="logo">
            <a href="#">Event Scheduler</a>
          </h1>
          <ul class="main-nav">
            {!auth.isLoggedin && (
              <li>
                <Link to="/login">Log in</Link>
              </li>
            )}
            {auth.isLoggedin && (
              <li>
                <a onClick={this.logOut}>Log out</a>
              </li>
            )}

            {!auth.isLoggedin && (
              <li>
                <Link to="/signup">Register</Link>
              </li>
            )}
          </ul>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);
