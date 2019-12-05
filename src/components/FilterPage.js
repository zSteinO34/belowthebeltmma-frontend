import React from 'react';
import { API } from '../constants';
import { connect } from 'react-redux';
import { getTags } from '../actions/tagActions';
import { fetchPosts } from '../actions/postActions';
import { withRouter } from 'react-router';

class FilterPage extends React.Component {
    componentDidMount() {
        this.props.getTags();
        if(!localStorage.getItem('token')) {
            this.props.fetchPosts()
        }
    }

    handleViewClick = (post_id) => {
        this.props.history.push(`/post/${post_id}`)
    }

    renderPosts = () => {
        if(this.props.tags !== []) {
            const tagName = this.props.match.path.slice(1)
            const filterTag = this.props.tags.find( ({ name }) => name === tagName);
            const filteredPosts = this.props.posts.allPosts.filter(post => {
                return post.tags.find(tag => {
                    return tag.id == filterTag.id
                })
            })
            return filteredPosts.map(post => {
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
    }

    render() {
        return (
            <div> 
                <h1 className="filter-header">{this.props.match.path.slice(1)}</h1>
                {this.renderPosts()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        tags: state.tags
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTags: () => dispatch(getTags()),
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterPage));