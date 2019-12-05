import React from 'react';
import { API } from '../constants';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class PostList extends React.Component {

    handleViewClick = (post_id) => {
        this.props.history.push(`/post/${post_id}`)
    }

    displayPosts = () => {
        return this.props.posts.allPosts.reverse().map(post => {
            return (
                <div className="post-card">
                    {post.header_img 
                        ?
                        <img src={`${API}/${post.header_img}`} alt="Profile" />
                        :
                        <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" alt="Profile" />
                    }
                    <div className="post-preview">
                        <h2>{post.title}</h2>
                        <hr />
                        <p>{post.content.slice(0, 250) + '...'}</p>
                        <button onClick={() => this.handleViewClick(post.id)}>View Post</button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="post-container">
                <h1>Newest Posts</h1>
                {this.displayPosts()}
            </div>
        )
    }

}

function mapStateToProps(state) {

    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(withRouter(PostList));