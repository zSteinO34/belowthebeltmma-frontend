import { API } from '../constants';

export const RECEIVED_NEW_USER = "RECEIVED_NEW_USER"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const RECEIVED_POSTS = "RECEIVED_POSTS"

// action creator
export function authorizeUser(user) {
    return {
        type: RECEIVED_NEW_USER,
        user: user
    }
}

export function receivedPosts(posts) {
    return {
        type: RECEIVED_POSTS,
        allPosts: posts
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
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(user => {
            dispatch(authorizeUser(user));
            fetch(`${API}/posts`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(posts => {
                dispatch(receivedPosts(posts));
            })
        })
    }
}

export function logoutUser() {
    return function(dispatch) {
        dispatch(removeUserState());
    }
}

