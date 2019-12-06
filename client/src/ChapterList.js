import React from 'react';
// import PropTypes from 'prop-types';
import { Card, List, Button, Tooltip, Skeleton, Progress } from 'antd';
import { connect } from "react-redux";
import * as actions from "./actions/chapterActions";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class ChapterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chapters: [], progresses: null}
  }

  componentWillMount() {
    console.log("@chapterlist componentDidMount!!");
    let userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log("Current user: " + JSON.stringify(userData));

    axios
      .get("/chapters/users/"+userData.user_id)
      .then(res => {
        console.log("eeee: "+ JSON.stringify(res.data));
        this.setState(res.data)
      })
      .catch(err =>
        alert(err)
      );
  }

  test = () => {
    // let item = this.state.chapters[0];
    let item = this.state
    console.log("item title: "+ JSON.stringify(item));
    // console.log(this.state.chapters[0].content.length);
    // console.log(this.state.progresses.progresses[item.title].viewed);
    // console.log("question: "+ JSON.stringify(this.state.chapters[0].questionSets[0]));
  }

  onSelectChapter = (item, e) => { // logic of using bind()!
    // this.setState({currentPage: e.target.value, chapterId: i}); // just to demo the usage of e and bind().
    // console.log(this.state.currentPage, this.state.chapterId);
    // console.log("onSelectChapter: "+JSON.stringify(item));
    // // this.props.history.push("/chapter/"+id);
    this.props.history.push({
      pathname: "/chapter/"+item._id
      // ,
      // state: { userScores: 40,//response.data,
      //          progresses: this.state.progresses.progresses[item.title]
      //          }
    })
  }

  onSelectTest = (i, e) => { // logic of using bind()!
    // const questionSetIndex = this.state.user.scores[i].findIndex((s,i,l) => l[i]===null);
    // // if tried all the tests, reset the scores:
    // if (questionSetIndex === -1) {
    //   this.openNotification(i);
    // }
    // else {
    //   this.setState({currentPage: 'testPage', chapterId: i, currentTest: questionSetIndex});
    // }
    // console.log(this.state.currentPage, this.state.chapterId, questionSetIndex);
    console.log("onSelectTest: " + JSON.stringify(i));
    //onClick={this.onSelectTest.bind(null, item)}
  }

  render() {
    const { chapters, userScores, progresses, onSelectTest, onSelectChapter} = this.props;
    return (
      <div>
      <button onClick={this.test}>check</button>
            <Card title='Your Progress' bordered={false}>
              <List
                className='demo-loadmore-list'
                itemLayout='horizontal'
                dataSource={this.state.chapters}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Tooltip
                        key='score'
                        placement='top'
                        title={`Not Passed`}
                      >
                          Best Score: 20
                      </Tooltip>
                      ,
                      <Tooltip key='chapter' placement='top' title={`Read Chapter ${item.title}`}>
                        <Button
                          value='chapterContentPage'
                          type='primary'
                          shape='circle'
                          icon='read'
                          size='small'
                          onClick={this.onSelectChapter.bind(null, item)}/>
                      </Tooltip>
                      ,
                      <Tooltip key='test' placement='top' title={`Take the test of Chapter ${item.title}`}>

                        {
                          this.state.progresses.progresses[item.title].viewed === item.content.length ?
                          <Link to={{pathname: '/questions/'+item._id,
                                     state: {
                                        chapterId: item._id,
                                        questionSetIndex: 0,
                                        questions: item.questionSets[0]
                                      }
                                    }}>
                            <Button
                              value='testPage'
                              type='primary'
                              shape='circle'
                              icon='form'
                              size='small'
                              ></Button></Link> :
                            <Button type='primary' shape='circle' icon='form' size='small' disabled/>
                        }

                      </Tooltip>
                    ]}
                  >
                    <Skeleton avatar title={false} loading={false} >
                      <List.Item.Meta
                        title={`${item.title}`}
                        description={
                          <Progress
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                            percent={100}
                          />
                        }
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Card>
            </div>
    );
  }

}

// // TODO 有問題
// const mapStateToProps = state => {
//   console.log("mapStateToProps: "+state);
//   return {
//     chapters: state.chapters
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     fetchChapters: () => {
//       dispatch(actions.fetchChapters());
//     }
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ChapterList);

export default ChapterList;
