import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './CoverPage.css'
import './UserDataManagement.css';
import { Form, Row, Col, Input, Button, Modal } from 'antd';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

  class Table extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        tableHeader: ["姓名", "员工编号", "邮箱", "分园", "部门", "操作"],
        visible: false,
        modalData: {},
        showUser: null,
        progress: {}
        }
     }

    handleOk = e => {
      this.setState({
        visible: false,
      });
    };

    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };

    resetScore = (chapter, user_id, IdKey) => {
      console.log("chapter", chapter);
      console.log("user_id", user_id)

      let userData = JSON.parse(localStorage.getItem("currentUser"))
      axios.put('/api/progresses/users/'+userData.user_id+'/reset', {"title": chapter})
      .then((response) => {
        window.location.href = "/manager";
        console.log("response: ", response);
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
                      学习进度
                    </Button>
                    <Link to={"/profile/"+_id}>
                      <Button  className="btn-gap"  type="primary">
                        账号信息
                      </Button>
                    </Link>
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
              title={(this.state.showUser) ? this.state.showUser.nickname+"的学习进度" : ''}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              cancelText="取消"
              okText="确定"
            >
              <p>姓名: {(this.state.showUser) ? this.state.showUser.nickname : '' }</p>
              <p>员工编号: {this.state.showUser ? this.state.showUser.staffID : ''}</p>
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
                      <p>学习进度: { Math.floor((chProg[chp].viewed / chapterLen) * 100) + "%"}</p>
                      <p ref={this.state.showUser.staffID + chp}>成绩: {Math.max(...chProg[chp].scores) > 0 ? Math.max(...chProg[chp].scores).toPrecision(3) : 0}</p>
                      {/* <Button type="danger" size="small" onClick={this.resetScore.bind(null, chp, this.state.showUser._id)}>
                        重设成绩
                      </Button> */}
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
    const searchFields = [['姓名', 'nickname'], ['员工编号', 'staffID'], ['邮箱', 'email']];
    const children = [];

    for (let i = 0; i < 3; i++) {
      children.push(
        <Col sm={24} md={8} key={i} >
          <Form.Item label={searchFields[i][0]} className="custom-form-item-label" wrapperCol={{ span: 4 }}>
            {getFieldDecorator(searchFields[i][1], {
              rules: [
                {
                  required: false,
                  message: 'Input something!',
                },
              ],
              className: "custom-form-item-label"
            })(<Input placeholder={searchFields[i][0]} />)}
          </Form.Item>
        </Col>,
      );
    }
  
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
                查找
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                清空
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
