import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Radio, Button, Card, Icon } from 'antd';
import { Statistic, Typography } from 'antd';

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
            <Text type='danger'>{'Ans: ' + answer}</Text> :
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
    })),
    questionSetIndex: PropTypes.number,
    onQuit: PropTypes.func,
    onScoreSubmit: PropTypes.func,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: Array(3).fill(null),
      userScore: null,
    };
  }

  onClick = (i,ans) => {
    if (!this.state.userScore) {
      // update userAnswer
      const userAnswers = this.state.userAnswers.slice();
      userAnswers[i] = ans;    
      this.setState({userAnswers: userAnswers});
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { chapterId, questionSetIndex, onScoreSubmit } = this.props;
    // calculate score
    if (!this.state.userScore) {
      const score = this.state.userAnswers.filter(
        (a, i) => a === this.props.questions[i].correctAnswer
      ).length / this.props.questions.length * 100;
      
      this.setState({userScore: score});
      onScoreSubmit(chapterId, questionSetIndex, score);
    }
  };

  render(){
    const { userAnswers, userScore } = this.state;
    const { questions, chapterId, onQuit } = this.props;

    return (
      <Card
        title={
          <>
            <Button type='link' onClick={onQuit} size='large'>
              <Icon type='left' />
            </Button>
            {`Test for Chapter ${chapterId + 1}`}
          </>
        }
        bordered={false}
        actions={[
          <Button key='submit' type='link' onClick={this.onSubmit} size='large'>
            <Icon type='check-circle' key='submit' theme='twoTone' twoToneColor='#52c41a' />
            Submit
          </Button>
          ,
          <Button key='quit' type='link' onClick={onQuit} size='large'>
            <Icon type='close-circle' key='quit' theme='twoTone' twoToneColor='#eb2f96' />
            Quit
          </Button>
        ]}
      >
        {
          userScore !== null ?
            <Statistic
              title='Your Score:'
              value={userScore}
              precision={1}
              valueStyle={{ color: userScore >= 70 ? '#3f8600' : '#cf1322'}}
            /> :
            null
        }
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
      </Card>
    );
  }
}

export default QuestionSet;