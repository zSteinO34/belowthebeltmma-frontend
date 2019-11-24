import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../actions/postActions';

class PostView extends React.Component {
    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
    }

    render() {
         return (
            <div className="post-view-container">
                <h1>{this.props.posts.title}</h1>
                <div className="post-view-header">
                    <img src={this.props.posts.img} />
                    <div>
                        <p>{this.props.posts.likes ? this.props.posts.likes.length : null} Like <i className="far fa-thumbs-up"></i></p>
                        <p>Share <i className="far fa-share-square"></i></p>
                    </div>
                </div>
                <p>{this.props.posts.content}</p>
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
        fetchSinglePost: (post_id) => dispatch(fetchSinglePost(post_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostView));