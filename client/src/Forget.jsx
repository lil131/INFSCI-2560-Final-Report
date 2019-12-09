import { Form, Icon, Input, Button, Card } from "antd";
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './Login.css';
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";
import axios from 'axios';

class Forget extends React.Component {
  static propTypes = {
    form: PropTypes.any,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios
          .post("/api/users/forgot", values)
          .then(res => {
            alert("please check you email and reset your password with an hour.")
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
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>

          <Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Send
              </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

}
Forget.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// export default Forget;
export default connect(
  mapStateToProps,
  { loginUser }
)(Forget);
