import React from 'react';
import { connect } from 'react-redux';
import { API } from '../constants';
import { withRouter } from 'react-router';

class AdminPage extends React.Component {
    renderPosts = () => {
        return this.props.user.posts.map(post => {
            return (
                <div className="post-card">
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" />
                    <div className="post-preview">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button>Edit Post</button>
                        <button>Delete Post</button>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.props.user)
        return (
            <div className="admin-page-container">
                <div className="admin-posts">
                    <button>Create New Post</button>
                    <h2>Your Posts:</h2> 
                    {this.renderPosts()}
                </div>
                <div className="admin-info">
                    <div className="admin-title">
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" />
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
        user: state.user
    }
}

export default connect(mapStateToProps)(AdminPage);