import React from 'react';
import { API } from '../constants'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../actions/postActions';
import { getPostLikes } from '../actions/likeActions';
import { createLike } from '../actions/likeActions';
import { unlikePost } from '../actions/likeActions';
import { getPostComments } from '../actions/commentActions';
import { createComment } from '../actions/commentActions';

class PostView extends React.Component {
    state = {
        showLink: false,
        comment: ''
    }

    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
        this.props.getPostLikes(this.props.match.params.id);
        this.props.getPostComments(this.props.match.params.id);
    }

    checkLoggedIn = () => {
        const token = localStorage.getItem("token");
        if(token) {
            return true
        } else {
            return false
        }
    }

    showLink = () => {
        this.setState({showLink: true})
    }

    hideLink = () => {
        this.setState({showLink: false})
    }

    handleCommentChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleNewCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            user_id: this.props.user.id,
            post_id: this.props.match.params.id,
            comment_body: this.state.comment,
            user: this.props.user
        }
        this.props.createComment(newComment);
        this.setState({comment: ''});
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

    renderComments = () => {
        return this.props.comments.map(comment => {
            return (
                <div className="comment">
                    <h5>{comment.user.username}:</h5>
                    <hr/>
                    <p>{comment.comment_body}</p>
                </div>
            )
        })
    }

    render() {
         return (
            <div className="post-view-container">
                <div className="post-view-header">
                    <div className="post-view-links">
                        <h1>{this.props.posts.singlePost.title}</h1>
                        <hr/>
                        {this.checkLoggedIn() 
                        ?
                            this.isLiked()
                            ? 
                            <button className="liked-btn" onClick={this.handleUnlike}> 
                                Liked
                            </button>
                            :
                            <button className="like-btn" onClick={this.handleLike}>
                                {this.props.likes.length ? `${this.props.likes.length} ` : null} 
                                Like <i className="far fa-thumbs-up"></i>
                            </button>
                        :
                        null}
                        {!this.state.showLink 
                            ? 
                            <p className="share-link" onClick={this.showLink}>Share Link <i className="far fa-share-square"></i></p> 
                            : 
                            <div>
                                <p className="hide-link" onClick={this.hideLink}>Hide Link</p>
                                <p className="url-link">{window.location.href}</p>    
                            </div>
                        }
                    </div>
                    <img src={`${API}/${this.props.posts.singlePost.header_img}`} />
                </div>
                <p className="post-view-content">{this.props.posts.singlePost.content}</p>
                <div className="post-view-comments">
                    <h3>Comments</h3>
                    {this.props.comments[0] ? this.renderComments() : <p>Be the first to comment</p>}
                    {this.checkLoggedIn() 
                        ?
                        <div>
                            <h4>New Comment</h4>
                            <form onSubmit={this.handleNewCommentSubmit}>
                                <textarea onChange={this.handleCommentChange} name="comment" id="comment" value={this.state.comment}></textarea><br />
                                <input className="comment-btn" type="submit" value="Comment"></input>
                            </form>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        user: state.user,
        likes: state.likes,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSinglePost: (post_id) => dispatch(fetchSinglePost(post_id)),
        getPostLikes: (post_id) => dispatch(getPostLikes(post_id)),
        createLike: (newLike) => dispatch(createLike(newLike)),
        unlikePost: (like_id) => dispatch(unlikePost(like_id)),
        getPostComments: (post_id) => dispatch(getPostComments(post_id)),
        createComment: (newComment) => dispatch(createComment(newComment))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostView));