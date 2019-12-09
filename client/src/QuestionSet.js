import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Radio, Button, Card, Icon } from 'antd';
import { Statistic, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

const OPT_MAP = ['A', 'B', 'C', 'D'];

class ChoiceQuestion extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    statement: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.number,
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
          OPT_MAP[answer] && OPT_MAP[answer] !== userAns ?
            <Text type='danger'>{'Ans: ' + OPT_MAP[answer]}</Text> :
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

  componentDidMount () {
    const { chapterId } = this.props.location.state
    console.log("chapterId: "+chapterId);
  }

  // render() {
  //   return(<h3>eeqweqww</h3>)
  // }
  static propTypes = {
    chapterId: PropTypes.number,
    questions: PropTypes.arrayOf(PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.string),
      _id: PropTypes.string,
      statement: PropTypes.string,
      correctAnswer: PropTypes.number,
    })),
    questionSetIndex: PropTypes.number,
    onQuit: PropTypes.func,
    onScoreSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      userAnswers: Array(this.props.location.state.questions.length).fill(null),
      userScore: null,
      disableSubmitBtn: false
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
    const { userAnswers, userScore } = this.state;
    const { questions } = this.props.location.state;
    // calculate score
    if (!userScore) {
      const score = userAnswers.filter(
        (a, i) => a === OPT_MAP[questions[i].correctAnswer]
      ).length / questions.length * 100;

      const { chapter_id } = this.props.match.params
      let userData = JSON.parse(localStorage.getItem("currentUser"))
      axios
        .put("/api/progresses/"+chapter_id+"/users/"+userData.user_id, {"score": score})
        .then(res => {
          this.setState({userScore: score, disableSubmitBtn: true});
        })
        .catch(err => {
          // console.log(JSON.parse(err).error);
          alert("Reached the maximum test times, please contact your manager to reset the score!")
        }
        );
    }
  };

  onQuit = () => {
    this.props.history.goBack()
  };

  test = () => {
    console.log("Quit");
    const { questions } = this.props.location.state;
    console.log("questions: " + JSON.stringify(questions));
    console.log("userAnswers: " + JSON.stringify(this.state.userAnswers));

    const { chapter_id } = this.props.match.params
    console.log("chapter id: "+chapter_id);
    console.log("Score: "+ this.state.userScore);
  };

  // render() {
  //   return (<button onClick={this.test}>check</button>)
  // }
  render(){
    const { userAnswers, userScore } = this.state;
    const { questions, chapterId } = this.props.location.state;

    return (
      <div>
      {/*<button onClick={this.test}>check</button>*/}
      <Card
        title={
          <>
            <Button type='link' onClick={this.onQuit} size='large'>
              <Icon type='left' />
            </Button>
            {`Test for Chapter ${chapterId}`}
          </>
        }
        bordered={false}
        actions={[
          <Button key='submit' type='link' onClick={this.onSubmit} size='large' disabled={this.state.disableSubmitBtn} >
            <Icon type='check-circle' key='submit' theme='twoTone' twoToneColor='#52c41a' />
            Submit
          </Button>
          ,
          <Button key='quit' type='link' onClick={this.onQuit} size='large'>
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
      </div>
    );
  }
}

export default QuestionSet;
