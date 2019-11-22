import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Button, Tooltip, Skeleton, Progress } from 'antd';
import { BrowserRouter  as Router, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute'
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{
//           pathname: '/login',
//           state: { from: props.location }
//         }} />
//   )} />
// )

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

class ChapterList extends React.Component {
  static propTypes = {
    chapters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.array,
      questionSets: PropTypes.array
    })),
    userScores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    progresses: PropTypes.arrayOf(PropTypes.number),
    onSelectTest: PropTypes.func,
    onSelectChapter: PropTypes.func,
  }

  render() {
    const { chapters, userScores, progresses, onSelectTest, onSelectChapter} = this.props;
    return (
      <div>
        <Router>
          <div>
            <AuthButton/>
            <ul>
              <li><Link to="/public">Public Page</Link></li>
              <li><Link to="/protected">Protected Page</Link></li>
            </ul>
            <Route path="/public" component={Public}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute path='/protected' component={Protected} />
          </div>
        </Router>

            <Card title='Your Progress' bordered={false}>
              <List
                className='demo-loadmore-list'
                itemLayout='horizontal'
                dataSource={chapters}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Tooltip
                        key='score'
                        placement='top'
                        title={Math.max(...userScores[item.id]) >= 70? `Passed!` : `Not Passed`}
                      >
                          Best Score: {Math.round(Math.max(...userScores[item.id]) * 10) / 10}
                      </Tooltip>
                      ,
                      <Tooltip key='chapter' placement='top' title={`Read Chapter ${item.id + 1}`}>
                        <Button
                          value='chapterContentPage'
                          type='primary'
                          shape='circle'
                          icon='read'
                          size='small'
                          onClick={onSelectChapter.bind(null, item.id)}/>
                      </Tooltip>
                      ,
                      <Tooltip key='test' placement='top' title={`Take the test of Chapter ${item.id + 1}`}>
                        {
                          progresses[item.id] === item.content.length ?
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
                        title={`${item.id + 1}. ${item.title}`}
                        description={
                          <Progress
                            strokeColor={{
                              '0%': '#108ee9',
                              '100%': '#87d068',
                            }}
                            percent={progresses[item.id] / item.content.length * 100}
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
export default ChapterList;
