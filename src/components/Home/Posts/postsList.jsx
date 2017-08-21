import React, {Component} from 'react';

import {
    Card,
    CardActions,
    CardHeader,
    CardTitle,
    CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from '../assets/images/person-flat.png';

import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts, deletePost, filterUsername, showAll } from './actions/actions';

class PostsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFiltered: false
        };
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    handleClick(args) {
        this.props.filterUsername(args);
        this.setState({
            isFiltered: true
        });
    }

    backHandler() {
        this.props.fetchPosts();
        this.setState({
            isFiltered: false
        })
    }

    render() {
        return (
            <div className="card-container">
                
                {this.props.posts.map((post) => {
                    return <Card className="the-post" key={post.id} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        onClick={() => this.props.filterUsername(post.username)}
                        title={post.username}
                        subtitle="username"
                        avatar={Avatar}
                        showExpandableButton= {false}/>
                    <CardTitle title={post.title}/>
                    <CardText expandable={false}>
                       {post.body}
                    </CardText>
                    
                    <CardActions>
                    {this.state.isFiltered && <FlatButton label="Back" onClick={() => this.backHandler()} /> }
                    <RaisedButton label="filter" onClick={() => this.handleClick(post.username)} />
                    <RaisedButton label="Delete" secondary={true} onClick={() => this.props.deletePost(post.id)} />
                    
                    <Link to={`post/1`}>
                        <RaisedButton primary={true} label="COMMENTS" />
                    </Link>
                    
                    </CardActions>
                                    
                </Card>
                })}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    posts : state.postsReducer.posts
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchPosts,
    deletePost,
    filterUsername,
    showAll
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);