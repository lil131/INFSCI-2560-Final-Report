import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './UserDataManagement.css';
import { Form, Row, Col, Input, Button, Cascader, Select, Modal } from 'antd';
import axios from 'axios';

const { Option } = Select;

const branches = [
    {
      value: 'branch-1',
      label: 'branch-1',
    },
    {
      value: 'branch-2',
      label: 'branch-2',
    },
  ];

const departments = [
    {
      value: 'department-1',
      label: 'department-1'
    },
    {
      value: 'department-2',
      label: 'department-2'
    },
    {
      value: 'department-3',
      label: 'department-3'
    }
  ];

  class Table extends React.Component {
    constructor(props) {
      super(props) 
      this.state = { 
        tableHeader: ["Name", "StaffID", "Email", "Branch", "Department", "Scores"],
        visible: false,
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
     
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    renderTableData() {
      console.log("staffList: ", this.props.staffList[0]);
      console.log("type: ", typeof(this.props.staffList))
      if (!this.props.staffList) {
        return;
       } else {
         return this.props.staffList.map((staff) => {
           const { branches, email, progresses, nickname, staffID } = staff
           return (
              <tr key={staffID}>
                <td>{nickname}</td>
                <td>{staffID}</td>
                <td>{email}</td>
                <td>{branches[0]}</td>
                <td>{branches[1]}</td>
                <td>
                  <div>
                    <Button type="primary" onClick={this.showModal}>
                      View Details
                    </Button>
                    <Modal
                      title="Basic Modal"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                    {
                      progresses.map((g) => {
                        return (
                          <p>{}</p> // <------------------- scores & chapters
                        )
                      })
                    }
                    </Modal>
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
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
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
    staff: []
  };

  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const searchFields = [['Name', 'nickname'], ['StaffID', 'staffID'], ['Email', 'email']];
    const selectFields = ['Branch', 'Department', 'Grade'];
    const selectFrom = [branches, departments];
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
          axios.post('/users/manager/search', values)
          .then((response) => {
            const staffs = response.data;
            console.log("staffs: ", staffs);
            this.setState({staff: staffs});
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
        <Table staffList={this.state.staff}/>
      </div>
    );
  }
}

export default UserDataManagement;
