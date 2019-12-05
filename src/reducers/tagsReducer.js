import { RECEIVED_TAGS } from '../actions/tagActions';

const initialState = []

export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_TAGS:
            return action.tags
        default:
            return state;
    }
}