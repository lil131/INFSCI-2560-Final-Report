import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './UserDataManagement.css';
import './CoverPage.css';
import { Button } from 'antd';
// import { Form, Row, Col, Input, Button, Modal } from 'antd';
import axios from 'axios';
// import { throws } from 'assert';
import {
  // BrowserRouter as Router,
  Link
} from "react-router-dom";

  class Table extends React.Component {
    constructor(props) {
      super(props)
      this.state = []
    }

    handleEdit = e => {
      console.log("Edit");
    };

    handleDelete = (chapter_id, e) => {
      console.log("DELETE", chapter_id);
      var r = window.confirm("This action is irreversible, are you sure to delete this chapter?");
      if (r === true) {
        axios
          .delete("/api/chapters/"+chapter_id)
          .then(res => {
            window.location.reload(false);
          })
          .catch(err =>
            alert(err)
          );
      }
    };

    resetScore = (chapter, user_id, IdKey) => {

    }

    renderTableData() {
      // console.log("userData: ", this.props.userData.staff);
      const chapters = this.props.chapterData; //array
      // console.log("type of staffList: ", typeof(this.props.staffList))
      console.log("props", this.props);
      if (!this.props) {
        return;
       } else {
         return chapters.map((chapter, chapterIndex) => {
           const { title, _id } = chapter
           return (
              <tr key={_id}>
                <td>{title}</td>
                <td>
                  {/* <Button onClick={this.handleEdit}>Edit</Button> */}
                  <Button onClick={this.handleDelete.bind(null, _id)} className="btn-gap" type="danger">Delete</Button>
                </td>
              </tr>
           )
        })
       }
    }

    renderTableHeader(header) {
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
    })
   }

   render() {
     const header = ['Chapter Title', "Delete"]
      return (
         <div>
            <table id='staff'>
               <tbody>
                  <tr key="header">{this.renderTableHeader(header)}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
  }




class ChapterDataManagement extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };

  state = {
    expand: false,
    chapterData: []
  };

  componentWillMount() {
    console.log("@chapterlist componentDidMount!!");
    let userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log("Current user: " + JSON.stringify(userData));

    axios
      .get("/api/chapters")
      .then(res => {
        console.log("chapters", res.data);
        this.setState({chapterData: res.data});
      })
      .catch(err =>
        alert(err)
      );
  }

  render() {
    return (
      <div>
        <Link to="/chapters/add">
          <Button className="custom-ant-btn layout-btn-right">Create Chapter</Button>
        </Link>
        <Table chapterData={this.state.chapterData}/>
      </div>
    );
  }
}

export default ChapterDataManagement;
