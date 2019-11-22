import { RECEIVED_NEW_USER } from '../actions/userActions';
import { LOGOUT_USER } from '../actions/userActions';

export default function userReducer(state = {}, action) {
    switch(action.type) {
        case RECEIVED_NEW_USER:
            return action.user;
        case LOGOUT_USER:
            return action.user;
        default:
            return state;
    }
}