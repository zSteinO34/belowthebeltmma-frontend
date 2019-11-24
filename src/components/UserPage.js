import React from 'react';
import { connect } from 'react-redux';
import { API } from '../constants';
import { withRouter } from 'react-router';

class UserPage extends React.Component {
    handleViewClick = (post_id) => {
        this.props.history.push(`/post/${post_id}`)
    }

    renderLikedPosts = () => {
        if(this.props.user.liked_posts !== undefined){
            return this.props.user.liked_posts.map(post => {
                return (
                    <div className="post-card">
                        <img src={post.img} />
                        <div className="post-preview">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <button onClick={() => this.handleViewClick(post.id)}>View Post</button>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div className="user-page-container">
                <div className="user-posts">
                    <h2>Your Liked Posts:</h2> 
                    {this.renderLikedPosts()}
                </div>
                <div className="user-info">
                    <div className="user-title">
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" />
                        <h2>{this.props.user.username}</h2>
                    </div>
                    <div className="user-stats">
                        <p>Some:</p>
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

export default connect(mapStateToProps)(withRouter(UserPage));