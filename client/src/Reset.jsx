import { Form, Icon, Input, Button, Card } from "antd";
import React from 'react';
// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './Login.css';
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";
import axios from 'axios';

class Reset extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };

  handleSubmit = e => {
    e.preventDefault();
    const {token} = this.props.match.params
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios
          .post("/api/users/reset/"+token, values)
          .then(res => {
            alert("Update your password successfully!, please login again")
            this.props.history.push("/login")
          })
          .catch(err =>
            alert(err)
          );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        className='login-card'
        cover={<img alt="example"
          src="https://99designs-start-attachments.imgix.net/alchemy-pictures/2019%2F01%2F31%2F23%2F02%2F16%2Fb5ebee9e-e517-44b4-8857-53e530a00b53%2FKitasavi.png?auto=format&ch=Width%2CDPR&w=250&h=250" />}
        bordered={false}
        style={{ width: 300 }}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("newPassword", {
              rules: [
                { required: true, message: "Please input your new password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("verifyPassword", {
              rules: [
                { required: true, message: "Please input your new password again!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Confirm Password"
              />
            )}
          </Form.Item>

          <Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset
              </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

}
Reset.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Reset);
