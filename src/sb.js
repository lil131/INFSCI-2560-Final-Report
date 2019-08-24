class App extends React.Component {

    render(){
      return (
        <>
          <QuestionSet id={1}/>
        </>
      );
    }
  }
  


  if (score >= 70){
    this.setState({completed: true})
    return(
      <>
        <Result
          status="success"
          title="Test Passed!"
          />
        <Statistic
          title="Score:"
          value={this.state.userScore}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
        />
        <Button type="primary" key="buy" block>Back to Manu</Button>
      </>
    );
  }
  else {
    return(
      <>
        <Result
          status="success"
          title="Test Passed!"
          />
        <Statistic
          title="Score:"
          value={this.state.userScore}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
        />
        <Button type="primary" key="buy" block>Try Again</Button>
        <Button key="buy" block>Back to Manu</Button>
      </>
    );
  }