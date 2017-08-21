import React from 'react';
import Post from './post';
import CommentInput from './commentInput';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const SingleArticle = (props) => (
            <MuiThemeProvider>
                 <div className="card-container">
                    <Post id={props.match.params.id} />
                    <CommentInput id={props.match.params.id} />
                 </div>
             </MuiThemeProvider>
);

export default SingleArticle