import { RECEIVED_LIKES } from '../actions/likeActions';
import { RECEIVED_NEW_LIKE } from '../actions/likeActions';
import { REMOVED_LIKE } from '../actions/likeActions';

const initialState = {
    likes: []
}

export default function likesReducer(state = initialState, action) {    
    switch(action.type) {
        case RECEIVED_LIKES:
            return action.likes;
        case RECEIVED_NEW_LIKE: 
            return [...state, action.likes];
        case REMOVED_LIKE:
            
            const indexRemoved = state.findIndex(like => {
                return like.id == action.likes.id
            })
            const newState = () => state.splice(indexRemoved, 1)
            return newState;
        default:
            return state;
    }
}