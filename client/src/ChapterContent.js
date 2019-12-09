import React from 'react';
// import PropTypes from 'prop-types';
import { Pagination, Card, Icon, Button } from 'antd';
import axios from 'axios';

class ChapterContent extends React.Component {
  // static propTypes = {
  //   chapterId: PropTypes.number,
  //   chapterTitle: PropTypes.string,
  //   bookmark: PropTypes.number,
  //   content: PropTypes.arrayOf(PropTypes.string),
  //   onBack: PropTypes.func
  // }

  constructor(props) {
    console.log("ChapterContent");
    super(props);
    this.state = {
      currentPage: 0,
      chapter: null,
      scores: null,
      chapter_content: []
    }
  }

  componentWillMount() {
    console.log("@chapterlist componentDidMount!!");
    const { chapter_id } = this.props.match.params
    let userData = JSON.parse(localStorage.getItem("currentUser"))
    axios
      .get("/api/chapters/"+chapter_id+"/users/"+userData.user_id)
      .then(res => {
        console.log("result: "+ JSON.stringify(res.data));
        console.log("rqerqrqw: "+res.data.chapter_content.title);
        let chapter_content = res.data.chapter_content
        let chapter_progress = res.data.progress[chapter_content.title]
        console.log(chapter_content.content);
        this.setState({
          currentPage: chapter_progress.viewed,
          chapter: chapter_content,
          scores: chapter_progress.scores,
          chapter_content: chapter_content.content,
        })
      })
      .catch(err =>
        alert(err)
      );
  }

  // // api: (p,ps)=>{}, if ps is not used, it can be omitted.
  onChangePage = (p) => {
    this.setState({currentPage: p});
  }

  onBack = () => {
    console.log("on back?");
    console.log(JSON.stringify(this.state))

    // TODO update viewed
    const { chapter_id } = this.props.match.params
    let userData = JSON.parse(localStorage.getItem("currentUser"))
    axios
      .put("/api/progresses/"+chapter_id+"/users/"+userData.user_id, {"viewed": this.state.currentPage === -1? 0 : this.state.currentPage})
      .then(res => {
        console.log("result: "+ JSON.stringify(res.data));
        this.props.history.goBack()
      })
      .catch(err =>
        alert(err)
      );
    // const bookmark = this.state.currentPage >= this.props.bookmark ?
    //   this.state.currentPage : this.props.bookmark;
    // this.props.onBack(this.props.chapterId, bookmark);
  };

  // render() {
  //   // const { chapterId, chapterTitle, content } = this.props;
  //   // const totalPage = content.length * 10;
  //   // console.log(this.state.currentPage)
  //
  //   return (
  //     <Card
  //       title={
  //         <>
  //           <Button type='link' onClick={this.onBack} size='large'>
  //             <Icon type='left' />
  //           </Button>
  //           {`Chapter ${this.state.chapter.title}`}
  //         </>
  //       }
  //       bordered={false}
  //     >
  //       <p>
  //         {this.state.content[0]}
  //       </p>
  //       <div align='center'>
  //         <Pagination defaultCurrent={this.state.currentPage} total={this.state.content.length* 10} onChange={this.onChangePage} />
  //       </div>
  //     </Card>
  //   );
  // }

  render() {
    return (
      <Card
        title={
          <>
            <Button type='link' onClick={this.onBack} size='large'>
              <Icon type='left' />
            </Button>
            {(this.state.chapter) ? this.state.chapter.title : ""}
          </>
        }
        bordered={false}
      >
        <p>
          {this.state.chapter_content[(this.state.currentPage - 1) < 0? 0 : (this.state.currentPage - 1)]}
          {console.log("content: ", this.state.chapter_content)}
          {console.log("curPage: ", (this.state.currentPage - 1)|0)}
        </p>
        <div align='center'>
          <Pagination defaultCurrent={this.state.currentPage|1} total={this.state.chapter_content.length * 10} onChange={this.onChangePage} />
        </div>
      </Card>
    );
  }


  // render() {
  //   return (<h3>Chapter</h3>)
  // }
}
export default ChapterContent;
