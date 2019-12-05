import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import Swal from 'sweetalert2';


class CreatePost extends React.Component {
    state = {
        title: '',
        header_img: '',
        content: ''
    }

    componentDidMount() {
        if(!localStorage.getItem('token') || !this.props.user.isAdmin) {
            this.props.history.push('/');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.title || !this.state.content || !this.state.header_img) {
            Swal.fire({
                icon: 'error',
                text: 'A Post must have valid title, image and content'
            });
            this.setState({
                title: '',
                header_img: null,
                content: ''
            })
        } else {
            const postData = new FormData()
            postData.append('post[title]', this.state.title)
            postData.append('post[header_img]', this.state.header_img)
            postData.append('post[content]', this.state.content)
            postData.append('post[user_id]', this.props.user.id)
            this.props.createPost(postData);
            this.props.history.push('/user-page');
            this.setState({
                title: '',
                header_img: null,
                content: ''
            })
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
                title: 'Post Created'
              })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleUpload = (e) => {
        e.preventDefault()
        this.setState({header_img: e.target.files[0]})
    }

    render() {
        return(
            <form className="new-post-form" onSubmit={this.handleSubmit}>
                <label htmlFor="title">Post Title:</label><br />
                    <input onChange={this.handleChange} type="text" id="title" name="posts[title]" value={this.state.title} placeholder="Title"></input><br />
                <label htmlFor="header_img">Post Image:</label><br />
                    <input onChange={this.handleUpload} type="file" id="header_img" name="posts[header_img]"></input><br />
                <label for='content'>Post Content:</label><br />
                    <textarea onChange={this.handleChange} id="content" name="posts[content]" value={this.state.content}></textarea><br />
                <input type="submit" value="Save Post" />
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (newPost) => dispatch(createPost(newPost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost));