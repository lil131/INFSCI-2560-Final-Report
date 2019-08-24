import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

// const data = [
//   {
//     title: 'Ant Design Title 1',
//   },
//   {
//     title: 'Ant Design Title 2',
//   },
//   {
//     title: 'Ant Design Title 3',
//   },
//   {
//     title: 'Ant Design Title 4',
//   },
// ];

class HomeLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  }

  render(){
    const { children } = this.props;

    return(
      <Layout>
        <Header>Header</Header>
        <Content>
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
export default HomeLayout;
