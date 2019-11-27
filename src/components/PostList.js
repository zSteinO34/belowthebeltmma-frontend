import React from 'react';
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
                    <img src={post.img} alt="Preview" />
                    <div className="post-preview">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={() => this.handleViewClick(post.id)}>View Post</button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="post-container">
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