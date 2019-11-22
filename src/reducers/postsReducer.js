import { RECEIVED_POSTS } from '../actions/postActions';

export default function postsReducer(state = [], action) {    
    switch(action.type) {
        case RECEIVED_POSTS:
            return action.posts;
        default:
            return state;
    }
}