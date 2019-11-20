import React from 'react';
import './App.css';
import HomeLayout from './HomeLayout'; //'.js' can be omitted.
import QuestionSet from './QuestionSet';
import ChapterContent from './ChapterContent';
import ChapterList from './ChapterList';
import ManagerPage from './ManagerPage';
import { Button, notification, Form } from 'antd';
import Login from './Login';

const WrappedLogin = Form.create({ name: 'normal_login' })(Login);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // chapterListPage, chapterContentPage, testPage, loginPage, managerPage
      currentPage: 'loginPage',
      showScore: false,
      chapterId: 0,
      currentTest: null,
      user: {
        admin: true,
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


  onClickOfMenu = (e) => this.setState({currentPage: e.key});
  // chapterListPage, chapterContentPage, testPage, loginPage, managerPage...

  onClickOfHome = () => this.setState({currentPage: 'chapterListPage'})

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

  renderChild() {
    const { user, currentPage, chapterId, chapters, currentTest } = this.state;

    switch (currentPage) {
      case 'loginPage': {
        return (
          <WrappedLogin />
        );
      }

      case 'managerPage': {
        return (
          <ManagerPage />
        );
      }

      case 'chapterListPage': {
        return (
          <ChapterList
            chapters={chapters}
            userScores={user.scores}
            progresses={user.bookmarks}
            onSelectTest={this.onSelectTest}
            onSelectChapter={this.onSelectChapter}
          />
        );
      }

      case 'chapterContentPage': {
        console.log(this.state.user.scores)
        return (
          <ChapterContent
            chapterId={chapterId}
            chapterTitle={chapters[chapterId].title}
            bookmark={user.bookmarks[chapterId]}
            content={chapters[chapterId].content}
            onBack={this.onBack}
          />
        );
      }

      case 'testPage': {
        const questionSet = chapters[chapterId].questionSets[currentTest];
        return (
          <QuestionSet
            chapterId={chapterId}
            questionSetIndex={currentTest}
            questions={questionSet}
            onScoreSubmit={this.onScoreSubmit}
            onQuit={this.onQuit}/>
        );
      }

      default: {
        return null;
      }
    }
  }

  render() {
    return (
      <HomeLayout user={this.state.user} onClickOfMenu={this.onClickOfMenu} onClickOfHome={this.onClickOfHome}>
        {this.renderChild()}
      </HomeLayout>
    );
  }
}

export default App;
