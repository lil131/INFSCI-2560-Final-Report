import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from "antd";
import './CoverPage.css';
import {
  // BrowserRouter as Router,
  Link
} from "react-router-dom";

const imgURL = "https://i.imgur.com/ny3oslC.jpg";
class CoverPage extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };
  constructor(props) {
    super(props)
    this.state = {}
  }

 onClickOfImage = () => {window.location.href = "/login";}

  render() {
    return (
      <div>
        {/*<h1><a href="/chapters">Staff Training System</a></h1>*/}
        <Link to="/login" className="flex-center"><Button className="custom-ant-btn banner-btns">Login Systen</Button></Link>
        <Card id="card-image">
          <img alt="Cover-Page" src={imgURL} onClick={this.onClickOfImage}></img>
        </Card>
      </div>
    )
  };
}

export default CoverPage;
