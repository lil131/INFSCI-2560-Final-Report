import React from 'react';
// import PropTypes from 'prop-types';
import './App.css';


class AccessDenied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h2 align="center">Permission Denied</h2>
        <img alt="Permission Denied" src="https://i.imgur.com/pgtbOn6.jpg"/>
      </div>
    );
  }
}

export default AccessDenied;
