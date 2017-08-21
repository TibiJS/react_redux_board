import React from 'react';
import {connect} from 'react-redux';
import request from 'superagent';
import {bindActionCreators} from 'redux';
import {fetchComments, fetchCommentsSuccess, filterTags} from '../actions/actions';
import CommentList from './CommentList';

import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      tags: '',
      the_comments: '',
      dataSource: []
    };
    this.clickedTag = [];
    this.theTags = [];

    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'inline-flex',
        flexWrap: 'wrap'
      }
    };
    this.setBody = ev => {
      this.setState({body: ev.target.value});
    };

    this.setTags = ev => {
      this.setState({tags: ev});
    }

    this.createComment = (ev) => {
      ev.preventDefault();
      const id = this.props.id;
      const payload = {
        comment: this.state.body,
        tags: this.state.tags
      };

      request
        .post(`http://localhost:9000/posts/${id}/comments`)
        .send({
          "body": payload.comment,
          "tags": [payload.tags]
        })
        .end((err, res) => props.fetchComments(id));

      this.setState({body: '', tags: ''});

    };
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value, value + value,
        value + value + value
      ]
    });
  };

  getListTags() {
    var arr = [];

    this
      .props
      .comments
      .forEach((comm) => {
        comm
          .tags
          .forEach((tag) => {
            if (!arr.includes(tag)) {
              arr.push(tag);
            }
          })
      });

    return arr
  }

  handleTagClick(tag) {
    if (!this.clickedTag.includes(tag)) {
      this
        .clickedTag
        .push(tag);
    }

    this
      .props
      .filterTags(this.clickedTag);
  }

  handleRequestDelete(tag) {

    var index = this
      .clickedTag
      .indexOf(tag);
    this
      .clickedTag
      .splice(index, 1);

    this
      .props
      .filterTags(this.clickedTag);
  }

  componentWillMount() {
    this
      .props
      .fetchComments(this.props.id)

  }

  componentDidMount() {
    this
      .props
      .comments
      .forEach((comm) => {
        comm
          .tags
          .forEach((tag) => {
            if (!this.theTags.includes(tag)) {
              this
                .theTags
                .push(tag);
            }
          })
      });
    var self = this;
    console.log(this.theTags);
    this.setState({dataSource: self.theTags})
  }
  render() {

    return (
      <div>
        {this
          .props
          .comments
          .map((comment) => {
            return <CommentList body={comment.body} tags={comment.tags} key={comment.id}/>
          })}

        {this
          .getListTags()
          .map((tag, index) => {
            return (
              <div style={this.styles.wrapper}>
                <Chip
                  onClick={() => {
                  this.handleTagClick(tag)
                }}
                  key={index}
                  onRequestDelete={() => {
                  this.handleRequestDelete(tag)
                }}>{tag}</Chip>
              </div>
            )
          })}

        <form className="card comment-form" onSubmit={this.createComment}>
          <div className="card-block">
            <TextField
              className="form-control"
              placeholder="Write a comment..."
              value={this.state.body}
              onChange={this.setBody}
              rows={2}
              rowsMax={4}
              fullWidth={true}/>

            <AutoComplete
              className="form-control"
              hintText="Add tags"
              dataSource={this.state.dataSource}
              fullWidth={true}
              onUpdateInput={(ev) => {
              this.setTags(ev)
            }}/>

            <RaisedButton
              fullWidth={true}
              className="btn btn-sm btn-primary"
              type="submit"
              primary={true}
              label="Submit Comment"></RaisedButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({comments: state.postsReducer.comments});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchComments,
  fetchCommentsSuccess,
  filterTags
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);
