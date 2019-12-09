import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "antd";
import './CoverPage.css';

const imgURL = "http://5b0988e595225.cdn.sohucs.com/images/20171025/7b06bb86ad6140bd9dac1f4b669f3103.jpeg";
class CoverPage extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };
  constructor(props) {
    super(props)
    this.state = {}
  }

 onClickOfImage = () => {window.location.href = "/chapters";}

  render() {
    return (
      <div>
        <h1><a href="/chapters">Staff Training System</a></h1>
        <Card id="card-image">
          <img alt="Cover-Page" src={imgURL} onClick={this.onClickOfImage}></img>
        </Card>
      </div>
    )
  };
}

export default CoverPage;