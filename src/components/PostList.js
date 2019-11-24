import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class PostList extends React.Component {
    componentDidMount() {
       this.props.fetchInitialPosts();
    }

    handleViewClick = (post_id) => {
        this.props.history.push(`/post/${post_id}`)
    }

    displayPosts = () => {
        return this.props.posts.allPosts.map(post => {
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

function mapDispatchToProps(dispatch) {
    return {
        fetchInitialPosts: () => dispatch(fetchPosts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostList));