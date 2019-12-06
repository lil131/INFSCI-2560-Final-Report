import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import { Tabs, Form } from 'antd';
import './ManagerPage.css';
import EditAccount from './EditAccount.jsx';
import UserDataManagement from './UserDataManagement';
import axios from 'axios';

const { TabPane } = Tabs;
const WrappedEditAccount = Form.create({ name: 'profile' })(EditAccount);


class EditAccountWrapper extends React.Component {

  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log("Current user: " + JSON.stringify(userData));

    axios
      .get("/users/"+userData.user_id)
      .then(res => {
        console.log("eeee: "+ JSON.stringify(res.data));
        this.setState(res.data)
      })
      .catch(err =>
        alert(err)
      );
  }

  render() {
    return(
      <div className="card-container">
        <WrappedEditAccount/>
      </div>
      );
  }
}

EditAccountWrapper.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(EditAccountWrapper);

// export default ManagerPage;
