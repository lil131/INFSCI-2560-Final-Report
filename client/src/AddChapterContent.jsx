import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import './Login.css';
import './AddChapterContent.css';
import { Form, Row, Col, Icon, Input, Button, Checkbox, Card } from "antd";
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";
import {Editor, EditorState, RichUtils} from 'draft-js';

class AddChapterContent extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  componentDidMount() {
    this.focusEditor();
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
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
      <div>
        <h2>Add Chapter</h2>

        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Form.Item label="Title">
            {getFieldDecorator("chapter_title", {
              rules: [
                {
                  required: false,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="Chapter Title" />)}
          </Form.Item>
          <Form.Item label="Content">
            {getFieldDecorator("content", {
              rule: [
                {
                  required: true,
                  message: "Input chapter content"
                }
              ]
            })(<div style={styles.editor} onClick={this.focusEditor}>
              <Editor
                ref={this.setEditor}
                editorState={this.state.editorState}
                onChange={this.onChange}
              />
            </div>)

            }
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Add another content
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const styles = {
  editor: {
    'border': '1px solid #d9d9d9',
    'minHeight': '6em',
    'border-radius': '4px',
    'padding': '0px 10px'
  }
};

export default AddChapterContent;
