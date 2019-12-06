import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }: RouteProps) => (
  <Route {...rest} render={props =>
      localStorage.getItem('currentUser') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login'/*, state: { from: props.location } */}} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
