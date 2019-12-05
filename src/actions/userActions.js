import { API } from '../constants';
import Swal from 'sweetalert2';

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
export function addUser(newUser, history) {
    return function(dispatch) {
        fetch(`${API}/users`, {
            method: "POST",
            body: newUser,
            contentType: false
        })
        .then(res => res.json())
        .then(user => {
            if(user.error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Username must be unique, Username must be more than 3 characters long, Password must be between 5 and 20 characters, Valid email must be entered'
                });
                history.push('/signup');
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
                localStorage.setItem("token", user.token);
                dispatch(authorizeUser(user));
                history.push('/');
            }
        })
    }
}

export function loginUser(user, history) {
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
            if(user.error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Invalid Username or Password'
                });
                history.push('/')
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
                localStorage.setItem("token", user.token);
                dispatch(authorizeUser(user));
                history.push('/user-page');
            }
        })
    }
}

export function getLoggedUser() {
    return function(dispatch){
        dispatch({type: 'START_AUTH'})
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

