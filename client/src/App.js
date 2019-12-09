import React from 'react';
// import PropTypes from "prop-types";
// import jwt_decode from "jwt-decode";
// import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { logoutUser } from "./actions/authActions";
// import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import { Button, notification, Form } from 'antd';
import { BrowserRouter  as Router, Switch, Route } from "react-router-dom";

import './App.css';
// import Landing from "./layout/Landing";
import HomeLayout from './HomeLayout'; //'.js' can be omitted.
import QuestionSet from './QuestionSet';
import ChapterContent from './ChapterContent';
import ChapterList from './ChapterList';
import ManagerPage from './ManagerPage';
import EditAccountWrapper from './EditAccountWrapper';
import Login from './Login';
import PrivateRoute from './components/PrivateRoute';
import AddChapterContent from './AddChapterContent'
import Forget from './Forget';
import Reset from './Reset';
import CoverPage from './CoverPage';

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
const WrappedForget = Form.create({ name: 'normal_forget' })(Forget);
const WrappedReset = Form.create({ name: 'normal_reset' })(Reset);
const WrappedAddChapterContent = Form.create({name: 'normal_addChapterContent'})(AddChapterContent);
// const WrappedAddCoverPage = Form.create({name: 'normal_coverPage'})(CoverPage);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // chapterListPage, chapterContentPage, testPage, loginPage, managerPage
      currentPage: '/chapters',
      showScore: false,
      chapterId: 0,
      currentTest: null,
      user: {admin: true,
        username: 'abc',
        password: '1234',
        scores: [[null, null], [null, null]],
        bookmarks: [2, 0] // 1 means page #1
      },
      chapters: [
        {
          id: 0,
          title: 'c1',
          content: ['1111-1','1111-2'],
          questionSets:[
            [{ // [ [{},{},{}] , [{},{},{}]] ,
              statement: 'ch1-qs1-1',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'C',
            }, {
              statement: 'ch1-qs1-2',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'D',
            }, {
              statement: 'ch1-qs1-3',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'D',
            }],
            [{
              statement: 'ch1-qs2-1',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'A',
            }, {
              statement: 'ch1-qs2-2',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'B',
            }, {
              statement: 'ch1-qs2-3',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'C',
            }]]},
        {
          id: 1,
          title: 'c2',
          content: ['2222-1','2222-2'],
          questionSets:[
            [{ // [ [{},{},{}] , [{},{},{}]] ,
              statement: 'ch1-qs1-1',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'C',
            }, {
              statement: 'ch1-qs1-2',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'A',
            }, {
              statement: 'ch1-qs1-3',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'B',
            }],
            [{
              statement: 'ch1-qs2-1',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'A',
            }, {
              statement: 'ch1-qs2-2',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'D',
            }, {
              statement: 'ch1-qs2-3',
              options: ['aa', 'bb', 'cc', 'dd'],
              correctAnswer: 'C',
            }]]}
      ],
    }
  }

  onClickOfMenu = (e) => {
    switch (e.key) {
      case 'profile':
      console.log("profile");
      let userData = JSON.parse(localStorage.getItem("currentUser"))
      window.location.href = "/profile/"+userData.user_id;
      break;
      case 'addChapter':
      window.location.href = "/chapters/add";
      break;
      case 'managerPage':
      console.log("managerPage");
      window.location.href = "/manager";
      break;
      case 'logout':
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
      break;
      default:
      break;
    }
    // this.setState({currentPage: e.key})
  };

  //this.setState({currentPage: 'chapterListPage'})
  onClickOfHome = () => {window.location.href = "/chapters";}

  onSelectChapter = (i, e) => { // logic of using bind()!
    this.setState({currentPage: e.target.value, chapterId: i}); // just to demo the usage of e and bind().
    console.log(this.state.currentPage, this.state.chapterId);
  }

  onSelectTest = (i) => { // logic of using bind()!
    const questionSetIndex = this.state.user.scores[i].findIndex((s,i,l) => l[i]===null);
    // if tried all the tests, reset the scores:
    if (questionSetIndex === -1) {
      this.openNotification(i);
    }
    else {
      this.setState({currentPage: 'testPage', chapterId: i, currentTest: questionSetIndex});
    }
    console.log(this.state.currentPage, this.state.chapterId, questionSetIndex);
  }

  openNotification = (i) => {
    const bestScore = Math.max(...this.state.user.scores[i]);
    const key = `open${Date.now()}`;
    const btn = (
      <Button type='primary' size='small' onClick={() => notification.close(key)}>
        Confirm
      </Button>
    );
    const msg = 'Chapter ' + (i + 1).toString() + bestScore >= 70 ? ' Passed!' : ' Failed!';
    notification.open({
      message: msg,
      description:
        bestScore >= 70 ?
          'You conquered this chapter, keep going to the next one.' :
          'You have failed all the tests of this chapter, please contact system manager for help.',
      btn,
      key,
      duration: 0,
    });
  };

  onBack = (i, bm) => {
    const {user} = this.state;
    const updatedUser = user;
    updatedUser.bookmarks[i] = bm;
    this.setState({currentPage: 'chapterListPage', user: updatedUser})
  };

  onQuit = () => {
    console.log(this.state.user.scores, this.state.showScore);
    this.setState({currentPage: 'chapterListPage'});
  }

  onScoreSubmit = (c, t, s) => {
    const {user, showScore} = this.state;
    const newScores = user.scores.map(arr => arr.slice());
    newScores[c][t] = s;
    this.setState({user: {...user, scores: newScores}});
    console.log(user.scores, c, t, s, showScore)
  }

  render() {
    // const { user, chapterId, chapters, currentTest } = this.state;
    // const questionSet = chapters[0].questionSets[0];

    // const MyChapterList = (props) => {
    //   return (
    //     <ChapterList
    //       userScores={user.scores}
    //       progresses={user.bookmarks}
    //       onSelectTest={this.onSelectTest}
    //       onSelectChapter={this.onSelectChapter}
    //     />
    //   );
    // }

    // const MyChapterContent = (props) => {
    //   return (
    //     <ChapterContent
    //       chapterId={chapterId}
    //       chapterTitle={chapters[chapterId].title}
    //       bookmark={user.bookmarks[chapterId]}
    //       content={chapters[chapterId].content}
    //       onBack={this.onBack}
    //     />
    //   );
    // }

    // const MyQuestionSet = (props) => {
    //   return (
    //     <QuestionSet
    //       chapterId={chapterId}
    //       questionSetIndex={currentTest}
    //       questions={questionSet}
    //       onScoreSubmit={this.onScoreSubmit}
    //       onQuit={this.onQuit}/>
    //   );
    // }

    return (
      <Provider store={store}>
        <Router>
          <HomeLayout user={this.state.user} onClickOfMenu={this.onClickOfMenu} onClickOfHome={this.onClickOfHome}>
            <div>
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL.
                  <PrivateRoute exact path="/" component={Landing} />*/}
                <Switch>
                  <Route exact path="/" component={CoverPage} />
                  <Route exact path="/login" component={WrappedLogin} />
                  <Route exact path="/forget" component={WrappedForget} />
                  <Route exact path="/reset/:token" component={WrappedReset} />
                  <PrivateRoute exact path="/manager" component={ManagerPage} />
                  <PrivateRoute exact path="/chapters" component={ChapterList} />
                  <PrivateRoute exact path="/chapter/:chapter_id" component={ChapterContent} />
                  <PrivateRoute exact path="/questions/:chapter_id" component={QuestionSet} />
                  <PrivateRoute exact path="/profile/:user_id" component={EditAccountWrapper} />
                  <PrivateRoute exact path="/chapters/add" component={WrappedAddChapterContent} />
                </Switch>
            </div>
          </HomeLayout>
        </Router>
      </Provider>
    );
  }
}

export default App;
