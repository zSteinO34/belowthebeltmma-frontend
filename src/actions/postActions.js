import { API } from '../constants';

export const START_AUTH = "START_AUTH"
export const RECEIVED_POSTS = "RECEIVED_POSTS"
export const RECEIVED_SINGLE_POST = "RECEIVED_SINGLE_POST"
export const RECEIVED_ADMIN_POSTS = "RECEIVED_ADMIN_POSTS"
export const RECEIVED_NEW_POST = "RECEIVED_NEW_POST"
export const RECEIVE_UPDATED = "RECEIVE_UPDATED"
export const DELETE_POST = "DELETE_POST"


//action creator

export function receivedPosts(posts) {
    return {
        type: RECEIVED_POSTS,
        allPosts: posts
    }
}

export function receivedSinglePost(post) {
    return {
        type: RECEIVED_SINGLE_POST,
        singlePost: post
    }
}

export function receivedNewPost(post) {
    return {
        type: RECEIVED_NEW_POST,
        post
    }
}

export function receiveUpdated(updatedPost) {
    return {
        type: RECEIVE_UPDATED,
        post: updatedPost
    }
}

export function deletePost(removedPost) {
    return {
        type: DELETE_POST,
        post: removedPost
    }
}

//thunk
export function startLoader() {
    return function(dispatch) {
        dispatch({type: START_AUTH})
    }
}

export function fetchPosts() {
    return function(dispatch) {
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
    }
}

export function fetchSinglePost(post_id) {
    return function(dispatch) {
        fetch(`${API}/posts/${post_id}`)
        .then(res => res.json())
        .then(post => {
            dispatch(receivedSinglePost(post));
        })
    }
}

export function createPost(newPost) {
    return function(dispatch) {
        fetch(`${API}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({post: newPost})
        })
        .then(res => res.json())
        .then(data => {
            const post = data.post
            dispatch(receivedNewPost(post));
        })
    }
}

export function updatePost(post_id, updatedPost) {
    return function(dispatch) {
        console.log('post', updatedPost)
        fetch(`${API}/posts/${post_id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedPost)
        })
        .then(res => res.json())
        .then(updatedPost => {
            dispatch(receiveUpdated(updatedPost))
        })
    }
}

export function removePost(post_id) {
    return function(dispatch) {
        fetch(`${API}/posts/${post_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(removedPost => {
            console.log('post', removedPost);
            dispatch(deletePost(removedPost))
        })
    }
}