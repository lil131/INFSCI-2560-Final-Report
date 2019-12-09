import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './CoverPage.css'
import './UserDataManagement.css';
import { Form, Row, Col, Input, Button, Modal } from 'antd';
import axios from 'axios';
// import { throws } from 'assert';
import {
  // BrowserRouter as Router,
  Link
} from "react-router-dom";

// const branches = [
//     {
//       value: 'branch-1',
//       label: 'branch-1',
//     },
//     {
//       value: 'branch-2',
//       label: 'branch-2',
//     },
//   ];

// const departments = [
//     {
//       value: 'department-1',
//       label: 'department-1'
//     },
//     {
//       value: 'department-2',
//       label: 'department-2'
//     },
//     {
//       value: 'department-3',
//       label: 'department-3'
//     }
//   ];

  class Table extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        tableHeader: ["Name", "StaffID", "Email", "Branch", "Department", "Scores"],
        visible: false,
        modalData: {},
        showUser: null,
        progress: {}
          //  staff: [
          //     {
          //       branches: ["branch-1", "department-1"],
          //       email: "cas386@pitt.edu",
          //       grade: 0,
          //       nickname: "Eden",
          //       password: "$2a$10$6AWdOMM0MjJp0oq.h1ES1ePA8R4sSq2HH8khC0aF7gpDmObpKAdkC",
          //       permission: 0,
          //       phone: 341241324341,
          //       prefix: 86,
          //       staffID: 1,
          //       __v: 0,
          //       _id: "5ddcd8d65692222ca785b1f8",
          //     },
          //     // { name: 'Ali', staffID: 19, email: 'ali@email.com', branch: 'branch-2', department: 'dep-2', scores: [90,30] }
          //  ]
        }
     }


    viewModal = (staffID, progresses, i) => {
      this.setState({
        visible: true,
      });
      const chapters = this.props.userData.chapters;
      return (
      <Modal
        title={staffID}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
      {
        Object.keys(progresses).map((chp, index) => {
          console.log("ch: ", chp);
          let chProg = progresses;
          let chapterLen = chapters[index].content.length;
          return (
            <div key={staffID + chp}>
              <h3 >{chp}</h3>
              <p>Staff ID: {staffID}</p>
              <p>Progress: { Math.floor((chProg[chp].viewed / chapterLen) * 100) + "%"}</p>
              <p ref={staffID + chp}>Score: {Math.max(...chProg[chp].scores) > 0 ? Math.max(...chProg[chp].scores) : 0}
              </p>
              <Button type="danger" size="small" onClick={this.resetScore.bind(null, chp, i, staffID + chp)}>
                Reset Score
              </Button>
            </div>
          );
        })
      }
      </Modal>
      )
    }


    handleOk = e => {
      // console.log(e);
      this.setState({
        visible: false,
      });
    };

    handleCancel = e => {
      // console.log(e);
      this.setState({
        visible: false,
      });
    };

    resetScore = (chapter, user_id, IdKey) => {
      // const myObject = this.refs[IdKey];
      // const showScore = "Score: 1";
      // myObject.innerHTML = showScore;
      console.log("chapter", chapter);
      console.log("user_id", user_id)

      let userData = JSON.parse(localStorage.getItem("currentUser"))
      axios.put('/api/progresses/users/'+userData.user_id+'/reset', {"title": chapter})
      .then((response) => {
        window.location.href = "/manager";
        // let p = this.state.showUser
        // p.progress[0].progresses.chapter.scores = []
        // // this.setState({showUser: p})

        // let tmp = this.state.userData
        // for (var i = 0 ; i < tmp.staff.length ; i++) {
        //   if (tmp.staff._id === user_id) {
        //     tmp.staff[i] = p
        //     break;
        //   }
        // }
        // this.setState({userData: tmp, showUser: p})
        // const userData = response.data;
        console.log("response: ", response);
        // this.setState({userData: userData});
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    viewModal2(staff) {
      console.log("dqwd:"+JSON.stringify(staff))
      this.setState({
        visible: true,
        showUser: staff,
        progress: staff.progress[0].progresses
      });
    }

    renderTableData() {
      console.log("userData: ", this.props.userData.staff);
      // const chapters = this.props.userData.chapters; //array
      // console.log("type of staffList: ", typeof(this.props.staffList))
      if (!this.props.userData.staff) {
        return;
       } else {
         return this.props.userData.staff.map((staff, staffIndex) => {
           const { branches, email, nickname, staffID, _id } = staff
           return (
              <tr key={staffID}>
                <td>{nickname}</td>
                <td>{staffID}</td>
                <td>{email}</td>
                <td>{branches[0]}</td>
                <td>{branches[1]}</td>
                <td>
                  <div>
                    <Button type="primary" onClick={() => this.viewModal2(staff)}>
                      View Details
                    </Button>
                    <Link to={"/profile/"+_id}>
                      <Button  className="btn-gap" type="primary">
                        Edit
                      </Button>
                    </Link>
                    {/* <Modal
                      title={staffID}
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                    {
                      Object.keys(progress[0].progresses).map((chp, index) => {
                        console.log("ch: ", chp);
                        let chProg = progress[0].progresses;
                        let chapterLen = chapters[index].content.length;
                        return (
                          <div key={staffID + chp}>
                            <h3 >{chp}</h3>
                            <p>Staff ID: {staffID}</p>
                            <p>Progress: { Math.floor((chProg[chp].viewed / chapterLen) * 100) + "%"}</p>
                            <p ref={staffID + chp}>Score: {Math.max(...chProg[chp].scores) > 0 ? Math.max(...chProg[chp].scores) : 0}
                            </p>
                            <Button type="danger" size="small" onClick={this.resetScore.bind(null, chp, i, staffID + chp)}>
                              Reset Score
                            </Button>
                          </div>
                        );
                      })
                    }
                    </Modal> */}
                  </div>
                </td>
              </tr>
           )
        })
       }
    }

    renderTableHeader() {
      let header = this.state.tableHeader;
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   render() {
      return (
         <div>
            <table id='staff'>
               <tbody>
                  <tr key="header">{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
            <Modal
          title={(this.state.showUser) ? this.state.showUser.nickname+"'s Progress" : ''}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Name: {(this.state.showUser) ? this.state.showUser.nickname : '' }</p>
          <p>Staff ID: {this.state.showUser ? this.state.showUser.staffID : ''}</p>
          {console.log("WTF:"+JSON.stringify(this.state.progress))}
          {<hr
                      style={{
                          color: "rgba(166,166,166,0.65)",
                          backgroundColor: "rgba(166,166,166,0.65)",
                          height: 1
                      }}
                  />}
          {
            Object.keys(this.state.progress).map((chp, index) => {
              console.log("ch: ", chp)
              console.log("index", index)
              console.log("fwe", this.state.progress[chp])
              console.log("chapter length", this.props.userData.chapters)
              let chapters = this.props.userData.chapters
              let chapterLen = chapters[index].content.length;
              let chProg = this.state.progress;
              return (
                <div key={this.state.showUser.staffID + chp}>
                  <h3 >{chp}</h3>
                  <p>Progress: { Math.floor((chProg[chp].viewed / chapterLen) * 100) + "%"}</p>
                  <p ref={this.state.showUser.staffID + chp}>Score: {Math.max(...chProg[chp].scores) > 0 ? Math.max(...chProg[chp].scores) : 0}</p>
                  <Button type="danger" size="small" onClick={this.resetScore.bind(null, chp, this.state.showUser._id)}>
                    Reset Score
                  </Button>
                  <hr
                      style={{
                          color: "rgba(166,166,166,0.65)",
                          backgroundColor: "rgba(166,166,166,0.65)",
                          height: 1
                      }}
                  />
                </div>
              )
            })
          }

        </Modal>
         </div>
      )
   }
  }




class UserDataManagement extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };

  state = {
    expand: false,
    userData: []
  };

  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const searchFields = [['Name', 'nickname'], ['StaffID', 'staffID'], ['Email', 'email']];
    // const selectFields = ['Branch', 'Department', 'Grade'];
    // const selectFrom = [branches, departments];
    const children = [];
    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: 'Ch1',
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="Ch1">Ch1</Option>
    //     <Option value="Ch2">Ch2</Option>
    //   </Select>,
    // );

    for (let i = 0; i < 3; i++) {
      children.push(
        <Col span={8} key={i} >
          <Form.Item label={searchFields[i][0]}>
            {getFieldDecorator(searchFields[i][1], {
              rules: [
                {
                  required: false,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder={searchFields[i][0]} />)}
          </Form.Item>
        </Col>,
      );
    }
    // for (let i = 0; i < 3; i++) {
    //   children.push(
    //     <Col span={8} key={i} >
    //       <Form.Item label={selectFields[i]}>
    //         {getFieldDecorator(selectFields[i], {
    //           rules: [
    //             {
    //               required: false,
    //               message: 'Input something!',
    //             },
    //           ],
    //         })
    //         // (
    //         //   // i === 2 ?
    //         //   //   <Input
    //         //   //     placeholder='Please input a threshold.'
    //           //     addonBefore={prefixSelector}
    //         //   //     style={{ width: '100%' }}
    //         //   //   /> :
    //         //     <Cascader options={selectFrom[i]} />)
    //         }
    //       </Form.Item>
    //     </Col>,
    //   );
    // }
    return children;
  }


  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
        if (!err) {
          axios.post('/api/users/manager/search', values)
          .then((response) => {
            const userData = response.data;
            console.log("userData: ", userData);
            this.setState({userData: userData});
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand, staff: [] });
  };

  render() {
    return (
      <div>
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
        <Table userData={this.state.userData}/>
      </div>
    );
  }
}

export default UserDataManagement;
