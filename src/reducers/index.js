import { combineReducers } from 'redux';
import posts from './postsReducer';
import user from './userReducer';
import likes from './likesReducer';
import comments from './commentsReducer';

export default combineReducers({
  posts,
  user,
  likes,
  comments
})