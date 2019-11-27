import { START_AUTH } from '../actions/postActions';
import { RECEIVED_POSTS } from '../actions/postActions';
import { RECEIVED_SINGLE_POST } from '../actions/postActions';
import { RECEIVED_NEW_POST } from '../actions/postActions';
import { RECEIVE_UPDATED } from '../actions/postActions';
import { DELETE_POST } from '../actions/postActions';

const initialState = {
    loading: false,
    allPosts: [],
    singlePost: {}
}

export default function postsReducer(state = initialState, action) {
    switch (action.type) {
        case START_AUTH:
            return { ...state, loading: true }
        case RECEIVED_POSTS:
            return { ...state, allPosts: action.allPosts, loading: false }
        case RECEIVED_SINGLE_POST:
            return { ...state, singlePost: action.singlePost };
        case RECEIVED_NEW_POST:
            return { ...state, allPosts: [...state.allPosts, action.post] };
        case RECEIVE_UPDATED:
            return {...state, allPosts: state.allPosts.map(post => post.id === action.post.id ? action.post : post)}
        case DELETE_POST:
            const newPosts = state.allPosts.filter(post => {
                return post.id !== action.post.id
            })
            return { ...state, allPosts: newPosts }
        default:
            return state;
    }
}