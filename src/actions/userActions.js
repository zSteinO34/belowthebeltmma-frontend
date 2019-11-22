import { API } from '../constants';

export const RECEIVED_NEW_USER = "RECEIVED_NEW_USER"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

// action creator
export function authorizeUser(user) {
    return {
        type: RECEIVED_NEW_USER,
        user: user
    }
}

export function removeUserState() {
    return {
        type: LOGOUT_USER,
        user: {}
    }
}

// thunk
export function addUser(newUser) {
    return function(dispatch) {
        fetch(`${API}/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: newUser})
        })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem("token", user.token)
            dispatch(authorizeUser(user));
        })
    }
}

export function loginUser(user) {
    return function(dispatch) {
        fetch(`${API}/auth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => {
            localStorage.setItem("token", user.token)
            dispatch(authorizeUser(user));
        })
    }
}

export function getLoggedUser() {
    return function(dispatch){
        const token = localStorage.getItem('token')
        fetch(`${API}/current_user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(user => {
            dispatch(authorizeUser(user));
        })
    }
}

export function logoutUser() {
    return function(dispatch) {
        dispatch(removeUserState());
    }
}

