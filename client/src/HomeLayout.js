import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import './HomeLayout.css';
import { Layout, Menu, Dropdown, Icon, Button } from 'antd';

const { Header, Footer, Content } = Layout;

class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.any,//children is a default property of all custom component.
    user: PropTypes.shape({
      admin: PropTypes.bool,
      username: PropTypes.string,
      password: PropTypes.string,
      scores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      bookmarks: PropTypes.arrayOf(PropTypes.number)}
    ),
    onClickOfMenu: PropTypes.func,
    onClickOfHome: PropTypes.func,
  }

  render(){
    const { children, onClickOfMenu, onClickOfHome } = this.props;
    const userData = JSON.parse(localStorage.getItem("currentUser"))
    const perm = userData ? userData.permission : -1
    const username = userData ? userData.nickname : "Guest"
    const menu =
      <Menu onClick={onClickOfMenu}>
        {perm === 0 ? <Menu.Item key='managerPage'>Management</Menu.Item> : null }
        {/*perm === 0 ? <Menu.Item key='addChapter'>Create chapter</Menu.Item> : null */}
        <Menu.Item key='profile'>Edit Profile</Menu.Item>
        <Menu.Item key='logout'>Log out</Menu.Item>
      </Menu>

    return(
      <Layout>
        <Header>
          <div className='left'>
            <Button type='primary' icon='home' shape='circle' onClick={onClickOfHome}/>
          </div>
          { userData ?
            <div className='right'>
              <Dropdown className='user' overlay={menu}>
                <a className='ant-dropdown-link' href='#'>
                  <Icon className='user' type='user' size='large' />
                  {username}
                  <Icon type='down' />
                </a>
              </Dropdown>
            </div> :
            null
          }
        </Header>
        <Content>
          <div style={{ background: '#ECECEC', padding: '30px', minHeight: '84vh'}}>
            {children}
          </div>
        </Content>
        <Footer>© 2018-2019 xxx.com. All rights reserved.</Footer>
      </Layout>
    );
  }
}

HomeLayout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(HomeLayout);

// export default HomeLayout;
// grey: #ECECEC
