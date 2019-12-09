import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import './DynamicFieldSet.css';
import axios from 'axios';
let id = 0;
const { TextArea } = Input;


class DynamicFieldSet extends Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // let interval = 6
    // for (var i = 0 ; i < 6 ; i++) {
      const nextKeys = keys.concat(id++);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    // }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        // console.log('Merged values:', keys.map(key => names[key]));
        let arr = values.names
        let result = []
        if (arr.length % 6 > 0) {
          alert("Please check the option amount.")
          return
        }
        for (var i = 0 ; i < arr.length ; i+=6) {
          let statement = arr[i]
          let options = arr.slice(i+1, i+5)
          let ans = arr[i+5]
          let correctAns = -1
          for (var j = 0 ; j < 4 ; j++) {
            if (options[j] == ans) {
              correctAns = j
              break
            }
          }

          if (correctAns == -1) {
            alert("Question " + (i/6 +1) + " didn't have correct answer")
            return
          }

          let obj = {"statement": statement, "options": options, "correctAnswer": correctAns}
          result.push(obj);
        }
        let chapter = {"title": values.chapter_title, "content": [values.content], "questionSets": [result]}
        console.log("result", chapter);
        axios
          .post("/api/chapters/", chapter)
          .then(res => {
            console.log("eeee: "+ JSON.stringify(res.data));
            window.location.href = "/chapters"
          })
          .catch(err =>
            alert(err)
          );
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index%6 === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index%6 === 0 ? 'Question'+(index/6+1)+':' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input option or delete this field.",
            },
          ],
        })(<Input placeholder={index%6 === 0 ? 'Question' : ((index%6===5)? 'Answer' : 'Option')} style={{ width: '80%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
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
            })(<TextArea rows={4} placeholder="Chapter Content"/>)
            }
          </Form.Item>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          {<Button type="primary" htmlType="submit">
            Submit
          </Button>}
        </Form.Item>
      </Form>
    );
  }
}

export default DynamicFieldSet;
