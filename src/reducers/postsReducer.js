import { RECEIVED_POSTS, getAdminPosts } from '../actions/postActions';
import { RECEIVED_SINGLE_POST } from '../actions/postActions';
import { RECEIVED_ADMIN_POSTS } from '../actions/postActions';

const initialState = {
    allPosts: [],
    singlePost: {}
}

export default function postsReducer(state = initialState, action) {    
    switch(action.type) {
        case RECEIVED_POSTS:
            return {...state, allPosts: action.allPosts}
        case RECEIVED_SINGLE_POST:
            return {allPosts: [...state.allPosts, action.singlePost.post], singlePost: action.singlePost};
        default:
            return state;
    }
}