import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Radio, Button, Card, Icon } from 'antd';
import { Statistic, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

class AccessDenied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<h2>Permission Denied</h2>)
  }
}

export default AccessDenied;
