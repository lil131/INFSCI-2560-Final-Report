import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Card } from 'antd';


class ChapterContent extends React.Component {
  static propTypes = {
    chapterId: PropTypes.number,
    chapterTitle: PropTypes.string,
    bookmark: PropTypes.number,
    content: PropTypes.arrayOf(PropTypes.string)
  }
  
  constructor(props) {
    super(props);
    this.state = {
      bookmark: this.props.bookmark,
    }
  }

  onChangePage = (p, ps) => {
    this.setState({bookmark: p - 1});
  }

  render() {
    const { chapterId, chapterTitle, content, bookmark} = this.props;
    const totalPage = content.length * 10;

    return (
      <Card
        title={`Chapter ${chapterId + 1}: ${chapterTitle}`}
        bordered={false}
      >
        <p>
          {content[this.state.bookmark]}
        </p>
        <div align="center">
          <Pagination defaultCurrent={bookmark + 1} total={totalPage} onChange={this.onChangePage} />
        </div>
      </Card>
    );
  }
}
export default ChapterContent;