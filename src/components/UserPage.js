import React from 'react';
import { connect } from 'react-redux';
import { API } from '../constants';
import { withRouter } from 'react-router';

class UserPage extends React.Component {

    renderLikedPosts = () => {
        console.log(this.props.user.liked_posts)
        if(this.props.user.liked_posts !== undefined){
            return this.props.user.liked_posts.map(post => {
                return (
                    <div className="post-card">
                        <img src="https://t3.ftcdn.net/jpg/02/48/42/64/240_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" />
                        <div className="post-preview">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <button>View Post</button>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        console.log(this.props)
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

// function mapDispatchToProps(dispatch) {
//     return {
//         getLikedPosts: (user) => dispatch(getLikedPosts(user))
//     }
// }

export default connect(mapStateToProps)(UserPage);