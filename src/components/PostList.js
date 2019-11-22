import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class PostList extends React.Component {
    componentDidMount() {
       this.props.fetchInitialPosts();
    }

    displayPosts = () => {
        return this.props.posts.map(post => {
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
export default connect(mapStateToProps, mapDispatchToProps)(PostList);