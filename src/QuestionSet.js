import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Radio, Button } from 'antd';
import { Statistic } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const OPT_MAP = ['A', 'B', 'C', 'D'];

class ChoiceQuestion extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    statement: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string,
    userAns: PropTypes.string, 
    onClick: PropTypes.func.isRequired
  }

  static defaultProps = { 
    userAns: null
  }
  
  onChange = e => this.props.onClick(this.props.id, e.target.value);
  
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    // show answer
    const { answer, userAns, id, statement, options } = this.props;
    return(
      <>
        {id + 1}. {statement}: { 
          // show answer when answer is not null and userAns is not same as answer:
          answer && answer !== userAns ?
            <Text type="danger">{"Ans: " + answer}</Text> :
            null
        }
        <br />
        <Radio.Group onChange={this.onChange}> 
          {
            options.map((o,i) => (
              <Radio key={i} style={radioStyle} value={OPT_MAP[i]}>
                {OPT_MAP[i]}. {o}
              </Radio>
            ))
          }
        </Radio.Group>
        <br />
      </>
    );
  }
}

class QuestionSet extends React.Component {
  static propTypes = {
    chapterId: PropTypes.number,
    questions: PropTypes.arrayOf(PropTypes.shape({
      statement: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      correctAnswer: PropTypes.string 
    }))
  };
  
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: Array(2).fill(null),
      userScore: null,
      pass: false,
    };
  }

  onClick = (i,ans) => this.handleClick(i,ans);
  handleClick(i, ans){
    if (!this.state.userScore) {
      // update userAnswer
      const userAnswers = this.state.userAnswers.slice();
      userAnswers[i] = ans;    
      this.setState({userAnswers: userAnswers});
    }
  }

  onQuit = () => {};

  onSubmit = (e) => {
    e.preventDefault();

    // calculate score
    if (!this.state.userScore) {
      const score = this.state.userAnswers.filter(
        (a, i) => a === this.props.questions[i].correctAnswer
      ).length / this.props.questions.length * 100;
      
      this.setState({userScore: score});
    }
  }

  render(){
    const { userAnswers, userScore } = this.state;
    const { questions, chapterId } = this.props;

    return (
      <>
        <header className="App-header">
          <p>Test for Chapter {chapterId}</p>
          {userScore !== null ?
            <Statistic
              title="Your Score:"
              value={userScore}
              precision={2}
              valueStyle={{ color: userScore >= 70 ? '#3f8600' : '#cf1322'}}
            /> :
            null
          }
        </header>
        {
          questions.map((q,i) =>
            <ChoiceQuestion
              key={i}
              id={i} 
              statement={q.statement}
              options={q.options}
              answer={userScore !== null? q.correctAnswer: null} 
              userAns={userAnswers[i]} 
              onClick={this.onClick} 
            />
          )
        }        
        <Button type="primary" onClick={this.onSubmit}>Submit</Button>
        <Button type="danger" onClick={this.onQuit}>Quit</Button>
      </>
    );
  }
}

export default QuestionSet;