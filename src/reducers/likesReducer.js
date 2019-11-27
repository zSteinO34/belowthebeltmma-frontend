import { RECEIVED_LIKES } from '../actions/likeActions';
import { RECEIVED_NEW_LIKE } from '../actions/likeActions';
import { REMOVED_LIKE } from '../actions/likeActions';

const initialState = []

export default function likesReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_LIKES:
            return action.likes;
        case RECEIVED_NEW_LIKE:
            return [...state, action.likes];
        case REMOVED_LIKE:
            return state.filter(like => {
                return like.id !== action.likes.id
            })
        default:
            return state;
    }
}