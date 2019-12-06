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
    console.log("Current user: " + userData.user_id);

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
  //
  // componentDidUpdate(nextProps) {
  //   console.log("@chapterlist componentWillReceiveProps!!");
  //   console.log("chapters: " + this.props.chapters);
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  // }

  test = () => {
    console.log("test btn");
    let item = this.state.chapters[0];
    console.log("item title: "+ item);
    console.log(this.state.progresses.progresses);
    console.log(this.state.progresses.progresses[item.title].viewed);
  }

  onSelectChapter = (item, e) => { // logic of using bind()!
    // this.setState({currentPage: e.target.value, chapterId: i}); // just to demo the usage of e and bind().
    // console.log(this.state.currentPage, this.state.chapterId);
    console.log("onSelectChapter: "+JSON.stringify(item));
    // this.props.history.push("/chapter/"+id);
    this.props.history.push({
      pathname: "/chapter/"+item._id
      // ,
      // state: { userScores: 40,//response.data,
      //          progresses: this.state.progresses.progresses[item.title]
      //          }
    })

    // <ChapterList
    //   userScores={user.scores}
    //   progresses={user.bookmarks}
    //   onSelectTest={this.onSelectTest}
    //   onSelectChapter={this.onSelectChapter}
    // />
  }

  onSelectTest = (i) => { // logic of using bind()!
    // const questionSetIndex = this.state.user.scores[i].findIndex((s,i,l) => l[i]===null);
    // // if tried all the tests, reset the scores:
    // if (questionSetIndex === -1) {
    //   this.openNotification(i);
    // }
    // else {
    //   this.setState({currentPage: 'testPage', chapterId: i, currentTest: questionSetIndex});
    // }
    // console.log(this.state.currentPage, this.state.chapterId, questionSetIndex);
    console.log("onSelectTest: " + i);
  }

  renderChapterCell = () => {
    return (
        <List
          className='demo-loadmore-list'
          itemLayout='horizontal'
          dataSource={this.state.chapters}
          renderItem = { item => (
            <List.Item actions={[
                      <Tooltip
                        key='score'
                        placement='top'
                        title={Math.max(...this.state.progresses.progresses[item.title].scores) >= 70? `Passed!` : `Not Passed`}
                      >
                          Best Score: {Math.round(Math.max(...this.state.progresses.progresses[item.title].scores) * 10) / 10}
                      </Tooltip>
                      ,
                      <Tooltip key='chapter' placement='top' title={`Read Chapter ${item.title}`}>
                        <Button
                          value='chapterContentPage'
                          type='primary'
                          shape='circle'
                          icon='read'
                          size='small'>
                          <Link to="/chapter/1"></Link>
                        </Button>
                      </Tooltip>
                      ,
                      <Tooltip key='test' placement='top' title={`Take the test of Chapter ${item.title}`}>
                        {
                          this.state.progresses.progresses[item.title].viewed === item.content.length ?
                            <Button
                              value='testPage'
                              type='primary'
                              shape='circle'
                              icon='form'
                              size='small'
                              onClick={this.onSelectTest.bind(null, item._id)}
                            /> :
                            <Button type='primary' shape='circle' icon='form' size='small' disabled/>
                        }
                      </Tooltip>
                    ]}
            >
            <Skeleton avatar title={false} loading={false} >
                    <List.Item.Meta
                      title={`${item._id}. ${item.title}`}
                      description={
                        <Progress
                          strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                          percent={this.state.progresses.progresses[item._id] / item.content.length * 100}
                        />
                      }
                    />
                  </Skeleton>
            </List.Item>
          )}
        />
    )
  }

  // render() {
  //   return (
  //     <div>
  //       <h3>32132131232</h3>
  //       <button onClick={this.test}>432423</button>
  //       <Card title='Your Progress' bordered={false}>
  //       </Card>
  //     </div>
  //   )
  // }



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
                          this.state.progresses.progresses[item.title] === item.content.length ?
                            <Button
                              value='testPage'
                              type='primary'
                              shape='circle'
                              icon='form'
                              size='small'
                              onClick={onSelectTest.bind(null, item.id)}
                            /> :
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
                            percent={50}
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
