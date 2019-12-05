import { API } from '../constants';

export const RECEIVED_TAGS = "RECEIVED_TAGS";
export const RECEIVED_NEW_TAG = "RECEIVED_NEW_TAG";

export function receivedTags(tags) {
    return {
        type: RECEIVED_TAGS,
        tags: tags
    }
}

export function receivedPostTag(newTag) {
    return {
        type: RECEIVED_NEW_TAG,
        tag: newTag
    }
}

export function getTags() {
    return function(dispatch) {
        fetch(`${API}/tags`)
        .then(res => res.json())
        .then(tags => {
            dispatch(receivedTags(tags))
        })
    }
}

// export function removeLike(removedLike) {
//     return {
//         type: REMOVED_LIKE,
//         likes: removedLike
//     }
// }

// export function createLike(newLike) {
//     return function(dispatch) {
//         fetch(`${API}/likes`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newLike)
//         })
//         .then(res => res.json())
//         .then(like => {
//             dispatch(receivedNewLike(like))
//         })
//     }
// }

// export function unlikePost(like_id) {
//     return function(dispatch) {
//         fetch(`${API}/likes/${like_id}`, {
//             method: 'DELETE'
//         })
//         .then(res => res.json())
//         .then(removedLike => {
//             dispatch(removeLike(removedLike));
//         })
//     }
// }