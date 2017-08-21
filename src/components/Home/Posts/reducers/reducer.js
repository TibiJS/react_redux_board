import { Record } from 'immutable';
import * as types from '../constants';
import _ from 'lodash';
const postsState = new Record({
    posts: [],
    currentPost: {},
    comments: [],
    originalComments: []
})

const initialState = new postsState();

const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SHOW_ALL:
            return state.set('posts', state.posts)
        case types.FILTER_POST_USERNAME:
         return state.set('posts', state.posts.filter(post =>
            post.username === action.payload.username
         ));
        case types.FETCH_POSTS_SUCCESS:
            return state.set('posts', [...action.payload.posts]);
        case types.FETCH_POSTS_ERROR:
            return state;
        case types.DELETE_POST_SUCCESS:
            return state.set('posts', [...action.payload.posts]);
        case types.DELETE_POST_ERROR:
            return state
        case types.FETCH_POST_BY_ID:
            return state.set('currentPost', action.payload.post);
        case types.FETCH_COMMENTS_SUCCESS:
            return state.set('comments', [...action.payload.comments]).set('originalComments', [...action.payload.comments]);
        case types.FILTER_TAGS:
            return state.set('comments', state.originalComments.filter((comment) => { 
                var intersect = _.intersection(comment.tags, action.payload);
                return _.isEqual(intersect.sort(), action.payload.sort());
            }))
        default:
            return state;
    }
}

export default postsReducer;