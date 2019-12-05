import React from 'react';
import { API } from '../constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { removePost } from '../actions/postActions';

class AdminPage extends React.Component {
    handleEditClick = (post_id) => {
        this.props.history.push(`/post/${post_id}/edit`);
    }

    renderPosts = () => {
        const adminPosts = this.props.posts.reverse().filter(post => {
            return post.user_id === this.props.user.id
        })
        return adminPosts.map(post => {
            return (
                <div key={post.id} className="admin-post-card">
                    {post.header_img 
                            ?
                            <img src={`${API}/${post.header_img}`} alt="Profile" />
                            :
                            <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" alt="Profile" />
                        }
                    <div className="admin-post-preview">
                        <h2>{post.title}</h2>
                        <hr />
                        <p>{post.content.slice(0, 200) + '...'}</p>
                        <div>
                            <button className="edit-btn" onClick={() => this.handleEditClick(post.id)}>Edit Post <i className="far fa-edit"></i></button>
                            <button className="delete-btn" onClick={() => this.props.removePost(post.id)} >Delete Post <i className="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            )
        })
    }
     
    handleCreatePostBtn = () => {
        this.props.history.push('/new-post');
    } 

    render() {
        return (
            <div className="admin-page-container">
                <div className="admin-posts">
                    <button className="new-post-btn" onClick={this.handleCreatePostBtn}>New Post <i class="far fa-plus-square"></i></button>
                    <h2>Your Posts:</h2> 
                    {this.renderPosts()}
                </div>
                <div className="admin-info">
                    <div className="admin-title">
                        {this.props.user.avatar 
                            ?
                            <img src={`${API}/${this.props.user.avatar}`} alt="Profile" />
                            :
                            <img src="https://cdn4.vectorstock.com/i/1000x1000/63/63/profile-placeholder-female-avatar-vector-21666363.jpg" alt="Profile" />
                        }
                        <h2>{this.props.user.username}</h2>
                    </div>
                    <p className="admin-bio">{this.props.user.bio}</p>
                    <hr/>
                    <div className="admin-stats">
                        <p><i class="fas fa-angle-right"></i> Number of posts: {this.props.posts.filter(post => {
                                                return post.user_id === this.props.user.id
                                            }).length} 
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts.allPosts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removePost: (post_id) => dispatch(removePost(post_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPage));