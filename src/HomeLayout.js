import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Layout, Menu, Dropdown, Icon, Button } from 'antd';

const { Header, Footer, Content } = Layout;

class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.shape({
      admin: PropTypes.bool,
      username: PropTypes.string,
      password: PropTypes.string,
      scores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      bookmarks: PropTypes.arrayOf(PropTypes.number)}
    ),
    onClickOfMenu: PropTypes.func
  }

  render(){
    const { children, user, onClickOfMenu } = this.props;
    const menu =  
      <Menu onClick={onClickOfMenu}>
        {user.admin? <Menu.Item key='managerPage'>Create account</Menu.Item> :
          null
        }
        <Menu.Item key='logout'>Log out</Menu.Item>
      </Menu>

    return(
      <Layout>
        <Header>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#"> 
              {user.username} 
              <Icon type="down" />
            </a>
          </Dropdown>
        </Header>
        <Content>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            {children}
          </div>
        </Content>
        <Footer>© 2018-2019 xxx.com. All rights reserved.</Footer>
      </Layout>
    );
  }
}
export default HomeLayout;
