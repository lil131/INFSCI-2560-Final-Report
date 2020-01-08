import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./actions/authActions";
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios';
// import md5 from 'md5';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import {
  Form,
  Card,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Button,
} from 'antd';

const { Option } = Select;
const defaultBranches = [
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
  constructor(props) {
    super(props)
    this.state = {
      userData: {
          "branches": [
              "branch-1",
              "department-2"
              ],
          "_id": "5ddcd8d65692222ca785b1f8",
          "prefix": 886,
          "email": "cas386@pitt.edu",
          "password": "$2a$10$47VR75cHvdWDuXJva2EXrO/tir4CoopUAH/Bv/Y2Pa7oljnBfpv3G",
          "nickname": "eden",
          "staffID": 1,
          "permission": 0,
          "phone": 341241324341,
          "grade": 0,
          "__v": 0
      }
    }
  }

  componentWillMount() {
    // let userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log("user_id", this.props.user_id);
    axios
      .get("/api/users/"+this.props.user_id)
      .then(res => {
        console.log("eeee: "+ JSON.stringify(res.data));
        this.setState({userData: res.data.userData})
      })
      .catch(err =>
        alert(err)
      );
  }

  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        delete values.confirm;
        if (values.password === undefined || values.password.length > 20) {
          delete values.password
        }

        let userData = JSON.parse(localStorage.getItem("currentUser"))
        axios
          .put("/api/users/"+this.props.user_id, values)
          .then(res => {
            console.log("eeee: "+ JSON.stringify(res.data));
            toastr.options = {
              positionClass : 'toast-top-full-width',
              hideDuration: 300,
              timeOut: 5000
            }
            toastr.clear()
            setTimeout(() => toastr.success(`Settings updated`), 1000)

            if (userData.email === values.email) {
              if(userData.nickname !== values.nickname) {
                userData.nickname = values.nickname
                localStorage.setItem("currentUser", JSON.stringify(userData));
                window.location.reload(false);
              }
            }

          })
          .catch(err =>
            alert(err)
          );
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
      callback('两次输入的密码不一致!');
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

  onBack = () => {
    window.history.back();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userData } = this.state;
    const { phone, branches, email, staffID, nickname, prefix } = this.state.userData;
    console.log("userData:", userData);

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
      initialValue: prefix,
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="852">+852</Option>
        <Option value="886">+886</Option>
        <Option value="1">+1</Option>
      </Select>,
    );

    return (
      <Card
        title={
          <>
            <Button type='link' onClick={this.onBack} size='large'>
              <Icon type='left' />
            </Button>
            {`返回`}
          </>
        }
        bordered={false}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              initialValue: email,
              rules: [
                {
                  type: 'email',
                  message: '邮箱地址无效!',
                },
                {
                  required: false,
                  message: '请输入邮箱!',
                }
              ],
            })(<p>{email}</p>)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                员工编号&nbsp;
                {/* <Tooltip title="请填写员工卡上的编号">
                  <Icon type="question-circle-o" />
                </Tooltip> */}
              </span>
            }
          >
            {getFieldDecorator('staffID', {
              initialValue: staffID
            })(<p>{staffID}</p>)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                姓名&nbsp;
                <Tooltip title="请填写员工卡上的姓名">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              initialValue: nickname,
              rules: [{ required: false, message: '请输入姓名!', whitespace: true }],
            })(<Input placeholder={nickname} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                密码&nbsp;
                <Tooltip title="密码需包含字母和数字">
                <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: false,
                  message: '请输入密码!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password placeholder="*****"/>)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: false,
                  message: '请确认密码!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password placeholder="*****" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="分园 / 部门">
            {getFieldDecorator('branches', {
              initialValue: [branches[0], branches[1]],
              rules: [
                { type: 'array', required: false, message: '请选择分园名称及部门!' },
              ],
            })(<Cascader options={defaultBranches} />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('phone', {
              initialValue: phone,
              rules: [{ required: false, message: '请输入电话号码!' }],
            })(<Input addonBefore={prefixSelector} placeholder={phone} style={{ width: '100%' }} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              保存更新
            </Button>
          </Form.Item>
        </Form>
      </Card>
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
