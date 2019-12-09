import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './Login.css';
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";

class Login extends Component {
  static propTypes = {
    form: PropTypes.any,
  };

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps!!"+JSON.stringify(nextProps));
    if (nextProps.auth.isAuthenticated) {
      // this.props.history.push("/chapters");
      window.location.href = "/chapters";
      // window.location.href = "/coverPage";
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.loginUser(values);
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
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/forget">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
    );
  }
}

Login.propTypes = {
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
)(Login);
// export default Login;
// logo: https://i.ibb.co/D83B97y/edin-logo.jpg
