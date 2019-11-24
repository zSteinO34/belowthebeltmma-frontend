import { combineReducers } from 'redux';
import posts from './postsReducer';
import user from './userReducer';
import likes from './likesReducer';

export default combineReducers({
  posts,
  user,
  likes
})