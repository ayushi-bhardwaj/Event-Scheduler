import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

import { Navbar, Home, Page404, Login, Signup } from './';
import { authenticateUser, signup } from '../actions/auth';

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user.user_id,
        })
      );
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path="/events"
              render={(props) => {
                console.log(props);
                return <Home />;
              }}
            />
            <Route exact path="/" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {}

export default connect()(App);
