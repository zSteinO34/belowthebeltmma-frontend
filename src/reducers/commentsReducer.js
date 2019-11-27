import { RECEIVED_POST_COMMENTS } from '../actions/commentActions';
import { RECEIVED_NEW_COMMENT } from '../actions/commentActions';

const initialState = []

export default function commentsReducer(state = initialState, action) {
    switch(action.type) {
        case RECEIVED_POST_COMMENTS:
            return action.comments
        case RECEIVED_NEW_COMMENT:
            return [...state, action.comments]        
        default: 
            return state;
    }
}