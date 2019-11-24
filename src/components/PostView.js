import React from 'react';
import { API } from '../constants'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../actions/postActions';
import { getPostLikes } from '../actions/likeActions';
import { createLike } from '../actions/likeActions';
import { unlikePost } from '../actions/likeActions';

class PostView extends React.Component {
    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
        this.props.getPostLikes(this.props.match.params.id);
    }

    checkLoggedIn = () => {
        const token = localStorage.getItem("token");
        if(token) {
            return true
        } else {
            return false
        }
    }

    handleLike = () => {
        const newLike = {
            user_id: this.props.user.id,
            post_id: this.props.match.params.id
        }
        this.props.createLike(newLike);
    }

    handleUnlike = () => {
        const like = this.props.likes.find(like => like.user_id == this.props.user.id)
        this.props.unlikePost(like.id);
        // console.log('unliking in progress....');
        // grab like with user ID
        // send request to backend (/likes/:id) and delete like object
        // update state to rerender component
    }

    isLiked = () => {
        if(this.props.likes[0]){
            let isLiked = this.props.likes.filter(like => like.user_id == this.props.user.id)
            if(isLiked.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    render() {
         return (
            <div className="post-view-container">
                <h1>{this.props.posts.singlePost.title}</h1>
                <div className="post-view-header">
                    <img src={this.props.posts.singlePost.img} />
                    <div>
                        {this.checkLoggedIn() 
                        ?
                            this.isLiked()
                            ? 
                            <button onClick={this.handleUnlike}> 
                                Liked
                            </button>
                            :
                            <button onClick={this.handleLike}>
                                {this.props.likes.length ? `${this.props.likes.length} ` : null} 
                                Like <i className="far fa-thumbs-up"></i>
                            </button>
                        :
                        null}
                        <p>Share <i className="far fa-share-square"></i></p>
                    </div>
                </div>
                <p>{this.props.posts.singlePost.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        user: state.user,
        likes: state.likes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSinglePost: (post_id) => dispatch(fetchSinglePost(post_id)),
        getPostLikes: (post_id) => dispatch(getPostLikes(post_id)),
        createLike: (newLike) => dispatch(createLike(newLike)),
        unlikePost: (like_id) => dispatch(unlikePost(like_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostView));