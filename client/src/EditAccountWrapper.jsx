import React from 'react';
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Form } from 'antd';
import './ManagerPage.css';
import EditAccount from './EditAccount.jsx';
// import UserDataManagement from './UserDataManagement';
// import axios from 'axios';

// const { TabPane } = Tabs;
const WrappedEditAccount = Form.create({ name: 'profile' })(EditAccount);

class EditAccountWrapper extends React.Component {
  render() {
    return(
      <div className="card-container">
        <WrappedEditAccount user_id={this.props.match.params.user_id}/>
      </div>
      );
  }
}

export default EditAccountWrapper;
