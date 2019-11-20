import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './UserDataManagement.css';
import { Form, Row, Col, Input, Button, Cascader, Select } from 'antd';

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
const grades = [
  {
    value: 'Ch1', 
    label: 'Ch1'
  }, 
  {
    value: 'Ch2', 
    label: 'Ch2'
  }
];

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
    const searchFields = ['Name', 'Staff ID', 'Email'];
    const selectFields = ['Branch', 'Department', 'Grade'];
    const selectFrom = [branches, departments, grades];
    const children = [];
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: 'Ch1',
    })(
      <Select style={{ width: 70 }}>
        <Option value="Ch1">Ch1</Option>
        <Option value="Ch2">Ch2</Option>
      </Select>,
    );
    
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
    for (let i = 0; i < 3; i++) {
      children.push(
        <Col span={8} key={i} >
          <Form.Item label={selectFields[i]}>
            {getFieldDecorator(selectFields[i], {
              rules: [
                {
                  required: false,
                  message: 'Input something!',
                },
              ],
            })(i === 2 ? 
                <Input 
                  placeholder='Please input a threshold.' 
                  addonBefore={prefixSelector} 
                  style={{ width: '100%' }} 
                /> : 
                <Cascader options={selectFrom[i]} />)
            }
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
    );
  }
}

export default UserDataManagement;