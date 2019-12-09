import React from 'react';
// import PropTypes from 'prop-types';
import { Card, List, Button, Tooltip, Skeleton, Progress } from 'antd';
// import { connect } from "react-redux";
// import * as actions from "./actions/chapterActions";
import axios from 'axios';
import {
  // BrowserRouter as Router,
  Link
} from "react-router-dom";

class ChapterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // chapters: [],
      // progresses: null,
    }
  }

  componentWillMount() {
    console.log("@chapterlist componentDidMount!!");
    let userData = JSON.parse(localStorage.getItem("currentUser"))
    console.log("Current user: " + JSON.stringify(userData));

    axios
      .get("/api/chapters/users/"+userData.user_id)
      .then(res => {
        console.log("eeee: "+ JSON.stringify(res.data));
        console.log("userID: ", userData.user_id);
        this.setState(res.data);
        // this.setState({chapters: res.data.chapters, progresses: res.data.progresses.progresses});
        console.log("prog: ", res.data.progresses);
      })
      .catch(err =>
        alert(err)
      );
  }

  test = () => {
    // let item = this.state.chapters[0];
    let item = this.state;
    // let chapters = this.state.chapters;
    console.log("item title: "+ JSON.stringify(item));
    console.log("progresses: "+ JSON.stringify(this.state.progresses));
    console.log("scores: " + JSON.stringify(this.state.progresses.progresses.ch1.scores));

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
    return (
      <div>
      {/*<button onClick={this.test}>check</button>*/}
            <Card title='Your Progress' bordered={false}>
              <List
                className='demo-loadmore-list'
                itemLayout='horizontal'
                dataSource={this.state.chapters}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Tooltip
                        key='score'
                        placement='top'
                        title={`Not Passed`}
                      >
                          Best Score: {
                            Math.max(...this.state.progresses.progresses[item.title].scores) > 0?
                              Math.max(...this.state.progresses.progresses[item.title].scores).toPrecision(3) : 0
                          }
                          {console.log("score of" + item.title + ":", this.state.progresses.progresses[item.title].scores)}
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
                            // percent={80}
                            percent={(this.state.progresses.progresses[item.title].viewed) / this.state.chapters[index].content.length * 100}
                          />
                        }
                      />
                      {console.log(item.title, this.state.progresses.progresses[item.title].viewed)}
                        {console.log("length: ", this.state.chapters[index].content.length)}
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
