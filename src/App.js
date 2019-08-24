import React from 'react';
import './App.css';
import HomeLayout from './HomeLayout'; //".js" can be omitted.
import QuestionSet from './QuestionSet'; 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onPage: 'testPage', // 
      chapterId: 1,
      user: {
        admin: false,
        username: "abc",
        password: "1234",
        scores: [[null, null], [null, null]],
        bookmarks: [0, 0]
      },
      chapters: [
        { 
          id: 0,
          content: ["1111"],
          questionSets:[[{ // [ [{},{},{}] , [{},{},{}]] ,
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
            }], [{ 
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
          id: 0,
          content: ["1111"],
          questionSets:[[{ // [ [{},{},{}] , [{},{},{}]] ,
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
            }], [{ 
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
            }]]}
      ],
    }
  };


  ChangePage = () => this.setState({onPage: "chapterPage"}); 
  // chapterPage, testPage, layoutPage, loginPage...

  renderChild() {
    const { user, onPage, chapterId, chapters } = this.state;
    

    switch (onPage) {
      case 'chapterPage':
        return null;        

      case 'testPage':
        const questionSetIndex = user.scores[chapterId].findIndex((s,i,l) => !l[i]);
        const questionSet = chapters[chapterId].questionSets[questionSetIndex];
        return <QuestionSet chapterId={chapterId} questions={questionSet} />

      default:
        return null;
    }
  }

  render() {
    return (
      <HomeLayout >
        {this.renderChild()}
      </HomeLayout>
    );
  }
}

export default App;
