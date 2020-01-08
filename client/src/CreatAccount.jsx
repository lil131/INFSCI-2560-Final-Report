import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./actions/authActions";
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Button,
} from 'antd';

const { Option } = Select;
const branches = [
  {
    value: 'branch-1',
    label: 'branch-1',
    children: [
      {
        value: 'department-1',
        label: 'department-1',
      },
      {
        value: 'department-2',
        label: 'department-2',
      },
      {
        value: 'department-3',
        label: 'department-3'
      }
    ],
  },
  {
    value: 'branch-2',
    label: 'branch-2',
    children: [
      {
        value: 'department-1',
        label: 'department-1',
      },
      {
        value: 'department-2',
        label: 'department-2',
      },
      {
        value: 'department-3',
        label: 'department-3'
      }
    ],
  },
];

class CreatAccount extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };

  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        delete values.confirm;
        // this.props.registerUser(values);

        // values.password = md5(values.password)
        axios.post('/api/users', values)
        .then(function (response) {
          console.log(response);
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 12,
          offset: 10,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="852">+852</Option>
      </Select>,
    );

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '邮箱地址无效!',
              },
              {
                required: true,
                message: '请输入邮箱!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              密码&nbsp;
              <Tooltip title="密码需包含字母和数字.">
              <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              姓名&nbsp;
              <Tooltip title="请填写员工卡上的姓名.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              员工编号&nbsp;
              <Tooltip title="请输入员工卡上的员工编号.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('staffID', {
            rules: [{ required: true, message: '请输入员工编号！', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="分园 / 部门">
          {getFieldDecorator('branches', {
            initialValue: ['branch-1', 'department-1'],
            rules: [
              { type: 'array', required: true, message: '请选择分园名称和部门!' },
            ],
          })(<Cascader options={branches} />)}
        </Form.Item>

        <Form.Item label="账号权限">
          {getFieldDecorator('permission', {
            rules: [{ required: true, message: '请选择账号权限' }],
          })(
            <Select
              placeholder="账号权限"
            >
              <Option value="0">管理员</Option>
              <Option value="1">普通用户</Option>
            </Select>,
          )}
        </Form.Item>


        <Form.Item label="电话">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入电话号码!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            创建账号
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

CreatAccount.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// export default CreatAccount;
export default connect(
  mapStateToProps,
  { registerUser }
)(CreatAccount);
