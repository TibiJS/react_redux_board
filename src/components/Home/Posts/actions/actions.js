import * as types from '../constants';

// Add typechecking
export const fetchPostsStart = () => ({
    type: types.FETCH_POSTS_START
})

export const fetchPostsSuccess = ( posts ) => ({
    type: types.FETCH_POSTS_SUCCESS,
    payload: { posts }
});

export const fetchPostsError = ( error: Error ) => ({
    type: types.FETCH_POSTS_ERROR,
    error
});

export const deletePostStart = () => ({
    type: types.DELETE_POST_START,
  });
  

export const deletePostError = ( error: Error ) => ({
    type: types.DELETE_POST_ERROR,
    error
});


export const fetchPostByIdSuccess = ( post ) => ({
    type: types.FETCH_POST_BY_ID,
    payload: { post }
})

export const deletePostSuccess = (id: Number) => ({
    type: types.DELETE_POST_SUCCESS,
    payload: { id }
})


export const deletePost = (id: Number) => dispatch => {
    fetch(`http://localhost:9000/posts/${id}`, {
         method: 'DELETE'
    }).then((res) => fetch('http://localhost:9000/posts')
        .then((response) => response.json())
        .then((body) => dispatch(fetchPostsSuccess(body)))
    )
}

export const fetchPosts = () => dispatch => {
    dispatch(fetchPostsStart());

    fetch('http://localhost:9000/posts')
        .then((response) => response.json())
        .then((body) => dispatch(fetchPostsSuccess(body)))
        .catch((error) => dispatch(fetchPostsError(error)));
}

export const fetchPostById = (id) => dispatch => {
   fetch(`http://localhost:9000/posts/${id}`)
        .then((response) => response.json())
        .then((body) => dispatch(fetchPostByIdSuccess(body)))
        .catch((error) => console.log(error));
}

export const filterUsername = (username: String) => ({
    type: types.FILTER_POST_USERNAME,
    payload: {username}
}) 


export const showAll = (posts) => ({
    type: types.SHOW_ALL
})

export const fetchComments = (id) => dispatch => {
     fetch(`http://localhost:9000/posts/${id}/comments`)
        .then((response) => response.json())
        .then((body) => dispatch(fetchCommentsSuccess(body)))
        .catch((error) => console.log(error));
}

export const fetchCommentsSuccess = (comments) => ({
    type: types.FETCH_COMMENTS_SUCCESS,
    payload: {comments}
})


export const filterTags = (tags: Array) => ({
    type: types.FILTER_TAGS,
    payload: tags
})