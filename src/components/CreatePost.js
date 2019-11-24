import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';

class CreatePost extends React.Component {
    state = {
        title: '',
        img: '',
        content: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            title: this.state.title,
            img: this.state.img,
            content: this.state.content,
            user_id: this.props.user.id
        }
        if(this.state.title !== '') {
            this.props.createPost(newPost);
            this.props.history.push('/user-page');
        } else {
            alert("Post needs a title");
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" id="title" name="posts[title]" value={this.state.title} placeholder="Title"></input>
                <input onChange={this.handleChange} type="text" id="img" name="posts[img]" value={this.state.img} placeholder="Image URL"></input>
                <textarea onChange={this.handleChange} id="content" name="posts[content]" value={this.state.content}></textarea>
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