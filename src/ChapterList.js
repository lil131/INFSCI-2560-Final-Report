import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Button, Tooltip, Skeleton, Progress } from "antd";

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
    onSelectElement: PropTypes.func
  }

  render() {
    const { chapters, userScores, progresses, onSelectElement} = this.props;
    return (
            <Card title="Your Progress" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={chapters}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Tooltip 
                        placement="top" 
                        title={Math.max(...userScores[item.id]) >= 70? `Passed!` : `Not Passed`}
                      >
                          Best Score: {Math.max(...userScores[item.id])}
                      </Tooltip>
                      ,
                      <Tooltip placement="top" title={`Read Chapter ${item.id + 1}`}>
                        <Button 
                          value='chapterContentPage'
                          type="primary" 
                          shape="circle" 
                          icon="read" 
                          size='small' 
                          onClick={onSelectElement.bind(null, item.id)}/>
                      </Tooltip>
                      ,
                      <Tooltip placement="top" title='Take the test'>
                        {
                          progresses[item.id] === item.content.length ?
                            <Button 
                              value='testPage'
                              type="primary" 
                              shape="circle" 
                              icon="form" 
                              size='small' 
                              onClick={onSelectElement.bind(null, item.id)}
                            /> :
                            <Button type="primary" shape="circle" icon="form" size='small' disabled/>
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
                      {/* <div>Best Score: {Math.max(...userScores[item.id])}</div> */}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Card>
    );
  }

}
export default ChapterList;
