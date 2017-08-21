import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostsList from './Posts/postsList';
import '../../App.css';

 const Home = () => (
    <div>
        <MuiThemeProvider>
            <PostsList />
        </MuiThemeProvider>
    </div>
)

export default Home