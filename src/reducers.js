import { combineReducers } from 'redux';
import postsReducer from './components/Home/Posts/reducers/reducer.js';
const appReducer =  combineReducers({
    postsReducer
});

export default appReducer;