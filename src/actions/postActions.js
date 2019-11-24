import { API } from '../constants';

export const RECEIVED_POSTS = "RECEIVED_POSTS"
export const RECEIVED_SINGLE_POST = "RECEIVED_SINGLE_POST"
export const RECEIVED_ADMIN_POSTS = "RECEIVED_ADMIN_POSTS"

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

//thunk
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
        .then(post => {
            dispatch(receivedSinglePost(post));
        })
    }
}