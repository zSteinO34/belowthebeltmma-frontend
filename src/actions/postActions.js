import { API } from '../constants';

export const RECEIVED_POSTS = "RECEIVED_POSTS"

export function receivedPosts(posts) {
    return {
        type: RECEIVED_POSTS,
        posts: posts
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
            console.log(posts);
            dispatch(receivedPosts(posts));
        })
    }
}