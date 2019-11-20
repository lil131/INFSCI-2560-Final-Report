import React from 'react';
import { Tabs, Form } from 'antd';
import './ManagerPage.css';
import CreatAccount from './CreatAccount'; 
import UserDataManagement from './UserDataManagement'; 

const { TabPane } = Tabs;
const WrappedCreatAccount = Form.create({ name: 'register' })(CreatAccount); 
const WrappedUserDataManagement = Form.create({ name: 'advanced_search' })(UserDataManagement);


class ManagerPage extends React.Component {
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

export default ManagerPage;
