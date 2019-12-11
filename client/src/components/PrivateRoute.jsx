import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ManagerPage from '../ManagerPage';


// const PrivateRoute = ({ component: Component, auth, ...rest }: RouteProps) => (
//   <Route {...rest} render={props =>
//       user ? ( (user.permission == 0) ?
//         <Component {...props} /> : ( (true) ? <Component {...props} /> : <Redirect to={{ pathname: '/login'}} />)
//       ) : (
//         <Redirect to={{ pathname: '/login'/*, state: { from: props.location } */}} />
//       )
//     }
//   />
// );

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (!currentUser) {
          return <Redirect to={{ pathname: '/login'}} />
        }

        if (currentUser.permission === 1 && window.location.pathname === '/manager') {
          return <Redirect to={{ pathname: '/forbidden'}} />
        }
        
        if (window.location.pathname.indexOf("/profile/") > -1) {
            var arr = (window.location.pathname).split("/")
            if (currentUser.permission === 1 && arr.pop() != currentUser.user_id) {
              return <Redirect to={{ pathname: '/forbidden'}} />
            }
        }
        return <Component {...props} />
    }} />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
