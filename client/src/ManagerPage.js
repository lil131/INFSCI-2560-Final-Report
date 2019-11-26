import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import { Tabs, Form } from 'antd';
import './ManagerPage.css';
import CreatAccount from './CreatAccount.jsx';
import UserDataManagement from './UserDataManagement';

const { TabPane } = Tabs;
const WrappedCreatAccount = Form.create({ name: 'register' })(CreatAccount);
const WrappedUserDataManagement = Form.create({ name: 'advanced_search' })(UserDataManagement);


class ManagerPage extends React.Component {

  componentDidMount() {
    console.log("componentDidMount: "+ this.props.auth.isAuthenticated);
  }

  render() {
    return(
      <div className="card-container">
        <Tabs type="card" size='large'>
          <TabPane tab="Creat Account" key="1">
            <WrappedCreatAccount />
          </TabPane>
          <TabPane tab="User Data Management" key="2">
            <WrappedUserDataManagement />
          </TabPane>
        </Tabs>
      </div>
      );
  }
}

ManagerPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManagerPage);

// export default ManagerPage;
