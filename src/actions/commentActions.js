import { API } from '../constants';

export const RECEIVED_POST_COMMENTS = "RECEIVED_POST_COMMENTS";
export const RECEIVED_NEW_COMMENT = "RECEIVED_NEW_COMMENT";

// action creators
export function receivedComments(postComments) {
    return {
        type: RECEIVED_POST_COMMENTS,
        comments: postComments
    }
}

export function receivedNewComment(comment) {
    return {
        type: RECEIVED_NEW_COMMENT,
        comments: comment
    }
}

// thunks
export function getPostComments(post_id) {
    return function(dispatch) {
        fetch(`${API}/comments`)
        .then(res => res.json())
        .then(comments => {
            const postComments = comments.filter(comment => comment.post_id == post_id)
            dispatch(receivedComments(postComments))
        })
    }
}

export function createComment(newComment) {
    return function(dispatch) {
        fetch(`${API}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        .then(res => res.json())
        .then(comment => {
            dispatch(receivedNewComment(comment))
        })
    }
}