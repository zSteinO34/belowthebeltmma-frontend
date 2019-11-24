import { API } from '../constants';

export const RECEIVED_LIKES = 'RECEIVED_LIKES';
export const RECEIVED_NEW_LIKE = 'RECEIVED_NEW_LIKE';
export const REMOVED_LIKE = 'REMOVED_LIKE';

//action creator
export function receivedLikes(postLikes) {
    return {
        type: RECEIVED_LIKES,
        likes: postLikes
    }
}

export function receivedNewLike(newLike) {
    return {
        type: RECEIVED_NEW_LIKE,
        likes: newLike
    }
}

export function removeLike(removedLike) {
    return {
        type: REMOVED_LIKE,
        likes: removedLike
    }
}

//thunk
export function getPostLikes(post_id) {
    return function(dispatch) {
        fetch(`${API}/likes`)
        .then(res => res.json())
        .then(likes => {
            const postLikes = likes.filter(like => like.post_id == post_id)
            dispatch(receivedLikes(postLikes));
        })
    }
}

export function createLike(newLike) {
    return function(dispatch) {
        fetch(`${API}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLike)
        })
        .then(res => res.json())
        .then(like => {
            dispatch(receivedNewLike(like))
        })
    }
}

export function unlikePost(like_id) {
    return function(dispatch) {
        fetch(`${API}/likes/${like_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(removedLike => {
            dispatch(removeLike(removedLike));
        })
    }
}