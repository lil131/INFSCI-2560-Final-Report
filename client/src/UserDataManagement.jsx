import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './UserDataManagement.css';
import { Form, Row, Col, Input, Button, Cascader, Select } from 'antd';
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
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
           staff: [
              { id: 1, name: 'Wasif', staffID: 21, email: 'wasif@email.com', scores: [90,30] },
              { id: 2, name: 'Ali', staffID: 19, email: 'ali@email.com', scores: [90,30] },
              { id: 3, name: 'Saad', staffID: 16, email: 'saad@email.com', scores: [90,30] },
              { id: 4, name: 'Asad', staffID: 25, email: 'asad@email.com', scores: [90,30] }
           ]
        }
     }

     renderTableData() {
       return this.state.staff.map((staff, index) => {
          const { id, name, staffID, email, scores } = staff //destructuring
          return (
             <tr key={id}>
                <td>{name}</td>
                <td>{staffID}</td>
                <td>{email}</td>
                <td>{scores}</td>
             </tr>
          )
       })
    }

    renderTableHeader() {
      let header = Object.keys(this.state.staff[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   render() {
      return (
         <div>
            <h1 id='title'>React Dynamic Table</h1>
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
  };

  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const searchFields = ['nickname', 'staffID', 'email'];
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
          <Form.Item label={searchFields[i]}>
            {getFieldDecorator(searchFields[i], {
              rules: [
                {
                  required: false,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder={searchFields[i]} />)}
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
          .then(function (response) {
            console.log(response);
            // TODO: Clear form data here
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
    this.setState({ expand: !expand });
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
        <Table/>
      </div>
    );
  }
}

export default UserDataManagement;
