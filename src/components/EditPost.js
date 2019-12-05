import React from 'react';
import { API } from '../constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updatePost } from '../actions/postActions';
import { fetchPosts } from '../actions/postActions';
import { startLoader } from '../actions/postActions';
import { getTags } from '../actions/tagActions';
import Swal from 'sweetalert2';

class EditPost extends React.Component {
    state = {
        title: '',
        header_img: '',
        content: ''
    }

    componentDidMount() {
        if(!localStorage.getItem('token') || !this.props.user.isAdmin) {
            this.props.history.push('/');
        }
        this.props.startLoader()
        this.props.fetchPosts()
        this.props.getTags()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.loading && !this.props.loading) {
            const post = this.props.posts.find(post => post.id == this.props.match.params.id)
            this.setState({
                title: post.title,
                header_img: post.header_img,
                content: post.content
            })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const post_id = this.props.match.params.id
        const updatedPost = {
            title: this.state.title,
            content: this.state.content,
            user_id: this.props.user.id
        }
        if (this.state.title !== '') {
            this.props.updatePost(post_id, updatedPost);
            this.props.history.push('/user-page');
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Post Saved'
              })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Cannot save post without a valid title'
            });
        }
    }

    deleteTag = (e, tag_id) => {
        e.target.className = "tag"
        fetch(`${API}/post_tags/${this.props.match.params.id}/${tag_id}`, {
            method: 'DELETE'
        })
    }

    clickTag = (e, tag_id) => {
        e.target.className = "tag-clicked"
        const ptObj = {
            post_id: this.props.match.params.id,
            tag_id: tag_id
        }
        fetch(`${API}/post_tags`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ptObj)
        })
    }

    renderTags = () => {
        const post = this.props.posts.find(post => post.id == this.props.match.params.id)
        return this.props.tags.map(tag => {
            if(post.tags.some(e => e.name === tag.name)) {
                return <p className="tag-clicked" onClick={(e) => this.deleteTag(e, tag.id)}>{tag.name.toUpperCase()}</p>
            } else {
                return <p className="tag" onClick={(e) => this.clickTag(e, tag.id)}>{tag.name.toUpperCase()}</p>
            }
        })
    }

    render() {
        if(this.props.loading) {
            return (
                <div>LOADING</div>
            )
        } else {
            return (
                <form className="edit-post-form" onSubmit={this.handleSubmit} >
                    <div className="edit-form-fields">
                        <label htmlFor='title'>Post Title:</label><br />
                            <input onChange={this.handleChange} type="text" id="title"
                                name="posts[title]" value={this.state.title}></input><br />
                        <label htmlFor='content'>Post Content:</label><br />
                            <textarea onChange={this.handleChange} id="content" name="posts[content]"
                                value={this.state.content}></textarea><br />
                        <input type="submit" value="Save Post" />
                    </div>
                    <div className="edit-form-tags">
                        {this.renderTags()}
                    </div>
                </form>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts.allPosts,
        loading: state.posts.loading,
        tags: state.tags
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTags: () => dispatch(getTags()),
        fetchPosts: () => dispatch(fetchPosts()),
        startLoader: () => dispatch(startLoader()),
        updatePost: (post_id, updatedPost) => dispatch(updatePost(post_id, updatedPost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));