import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { updatePost } from '../actions/postActions';
import { fetchPosts } from '../actions/postActions';
import { startLoader } from '../actions/postActions';

class EditPost extends React.Component {
    state = {
        title: '',
        img: '',
        content: ''
    }

    componentDidMount() {
        this.props.startLoader()
        this.props.fetchPosts()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.loading && !this.props.loading) {
            const post = this.props.posts.find(post => post.id == this.props.match.params.id)
            this.setState({
                title: post.title,
                img: post.img,
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
            img: this.state.img,
            content: this.state.content,
            user_id: this.props.user.id
        }
        if (this.state.title !== '') {
            this.props.updatePost(post_id, updatedPost);
            this.props.history.push('/user-page');
        } else {
            alert("Post needs a title");
        }
    }

    render() {
        if(this.props.loading) {
            return (
                <div>LOADING</div>
            )
        } else {
            return (
                <form className="edit-post-form" onSubmit={this.handleSubmit} >
                    <input onChange={this.handleChange} type="text" id="title"
                        name="posts[title]" value={this.state.title}></input><br />

                    <input onChange={this.handleChange} type="text" id="img"
                        name="posts[img]" value={this.state.img} placeholder="Image URL"></input><br />

                    <label htmlFor='content'>Post Content:</label><br />
                    <textarea onChange={this.handleChange} id="content" name="posts[content]"
                        value={this.state.content}></textarea><br />

                    <input type="submit" value="Save Post" />
                </form>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts.allPosts,
        loading: state.posts.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        startLoader: () => dispatch(startLoader()),
        updatePost: (post_id, updatedPost) => dispatch(updatePost(post_id, updatedPost))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));