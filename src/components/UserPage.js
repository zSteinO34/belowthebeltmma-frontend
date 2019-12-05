import React from 'react';
import { API } from '../constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class UserPage extends React.Component {
    handleViewClick = (post_id) => {
        this.props.history.push(`/post/${post_id}`)
    }

    renderLikedPosts = () => {  
        if(this.props.user.liked_posts !== undefined){
            const allLikedPosts = this.props.posts.allPosts.filter(post => {
                return this.props.user.liked_posts.find(likedPost => {
                    return post.id == likedPost.id
                })
            })
            return allLikedPosts.map(post => {
                return (
                    <div className="user-post-card">
                        {post.header_img 
                            ?
                            <img src={`${API}/${post.header_img}`} alt="Profile" />
                            :
                            <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" alt="Profile" />
                        }
                        <div className="user-post-preview">
                            <h2>{post.title}</h2>
                            <p>{post.content.slice(0, 200) + '...'}</p>
                            <div>
                                <button className="view-btn" onClick={() => this.handleViewClick(post.id)}>View Post</button>
                            </div>
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
                        {this.props.user.avatar 
                            ?
                            <img src={`${API}/${this.props.user.avatar}`} alt="Profile" />
                            :
                            <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" alt="Profile" />
                        }
                        <h2>{this.props.user.username}</h2>
                    </div>
                    <p className="user-bio">{this.props.user.bio}</p>
                    <hr/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts
    }
}

export default connect(mapStateToProps)(withRouter(UserPage));