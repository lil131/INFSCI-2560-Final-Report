import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Card, Icon, Button } from 'antd';


class ChapterContent extends React.Component {
  static propTypes = {
    chapterId: PropTypes.number,
    chapterTitle: PropTypes.string,
    bookmark: PropTypes.number,
    content: PropTypes.arrayOf(PropTypes.string),
    onBack: PropTypes.func
  }
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.bookmark === 0 ? 1 : this.props.bookmark
    }
  }

  // api: (p,ps)=>{}, if ps is not used, it can be omitted.
  onChangePage = (p) => {
    this.setState({currentPage: p});
  }

  onBack = () => {
    const bookmark = this.state.currentPage >= this.props.bookmark ? 
      this.state.currentPage : this.props.bookmark;
    this.props.onBack(this.props.chapterId, bookmark);
  };

  render() {
    const { chapterId, chapterTitle, content } = this.props;
    const totalPage = content.length * 10;
    console.log(this.state.currentPage)

    return (
      <Card
        title={
          <>
            <Button type='link' onClick={this.onBack} size='large'>
              <Icon type='left' />
            </Button>
            {`Chapter ${chapterId + 1}: ${chapterTitle}`}
          </>
        }
        bordered={false}
      >
        <p>
          {content[this.state.currentPage - 1]}
        </p>
        <div align='center'>
          <Pagination defaultCurrent={this.state.currentPage} total={totalPage} onChange={this.onChangePage} />
        </div>
      </Card>
    );
  }
}
export default ChapterContent;