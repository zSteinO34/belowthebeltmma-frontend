import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { removePost } from '../actions/postActions';

class AdminPage extends React.Component {
    handleEditClick = (post_id) => {
        this.props.history.push(`/post/${post_id}/edit`);
    }

    renderPosts = () => {
        const adminPosts = this.props.posts.filter(post => {
            return post.user_id === this.props.user.id
        })
        return adminPosts.map(post => {
            return (
                <div key={post.id} className="post-card">
                    <img src={post.img} alt="Preview" />
                    <div className="post-preview">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={() => this.handleEditClick(post.id)}>Edit Post</button>
                        <button onClick={() => this.props.removePost(post.id)} >Delete Post</button>
                    </div>
                </div>
            )
        })
    }
    // 
    handleCreatePostBtn = () => {
        this.props.history.push('/new-post');
    }

    render() {
        return (
            <div className="admin-page-container">
                <div className="admin-posts">
                    <button onClick={this.handleCreatePostBtn}>Create New Post</button>
                    <h2>Your Posts:</h2> 
                    {this.renderPosts()}
                </div>
                <div className="admin-info">
                    <div className="admin-title">
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" alt="Profile" />
                        <h2>{this.props.user.username}</h2>
                    </div>
                    <div className="admin-stats">
                        <p>Number of posts:</p>
                        <p>Something:</p>
                        <p>Something Something:</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts.allPosts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removePost: (post_id) => dispatch(removePost(post_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPage));