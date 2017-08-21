import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import { fetchPostById } from '../actions/actions';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import Avatar from '../../assets/images/person-flat.png';

class Post extends Component {
  componentWillMount() {
      this.props.fetchPostById(this.props.id);// req new
  }

  render() {
    return(
       <Card>
        <CardHeader
          title={this.props.currentPost.username}
          subtitle="username"
          avatar={Avatar}
        />
         <CardTitle title={this.props.currentPost.title}/>
        <CardText>
         {this.props.currentPost.body}
        </CardText>
        <CardActions>
           <Link to={`/`}>
            <RaisedButton secondary={true} label="BACK" />
        </Link>
          </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
    posts : state.postsReducer.posts,
    currentPost: state.postsReducer.currentPost
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
   fetchPostById
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post);