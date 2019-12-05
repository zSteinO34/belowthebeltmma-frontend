import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addUser } from '../actions/userActions';
import Swal from 'sweetalert2';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        confirm: '',
        email: '',
        isAdmin: false,
        bio: '',
        avatar: null
    }

    componentDidMount() {
        if(localStorage.getItem('token')) {
            this.props.history.push('/');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.avatar) {
            Swal.fire({
                icon: 'error',
                text: 'User must have a profile image'
            });
            this.setState({
                username: '',
                password: '',
                confirm: '',
                email: '',
                bio: '',
                avatar: null
            })
        } else {
            if(this.state.password === this.state.confirm) {
                const userData = new FormData()
                userData.append('user[username]', this.state.username)
                userData.append('user[password]', this.state.password)
                userData.append('user[email]', this.state.email)
                userData.append('user[bio]', this.state.bio)
                userData.append('user[isAdmin]', this.state.isAdmin)
                userData.append('user[avatar]', this.state.avatar)
                this.props.signupUser(userData, this.props.history)
                this.setState({
                    username: '',
                    password: '',
                    confirm: '',
                    email: '',
                    bio: '',
                    avatar: null
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Password and Confirm Password must match'
                });
                this.setState({
                    username: '',
                    password: '',
                    confirm: '',
                    email: '',
                    bio: '',
                    avatar: null
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleUpload = (e) => {
        e.preventDefault()
        this.setState({avatar: e.target.files[0]})
    }

    render () {
        return (
            <div className="signup-page">
                <h2>New User Sign Up</h2>
                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" id="username" name="user[username]" value={this.state.username} placeholder="Username"></input><br />
                    <input onChange={this.handleChange} type="password" id="password" name="user[password]" value={this.state.password} placeholder="Password"></input><br />
                    <input onChange={this.handleChange} type="password" id="confirm" name="user[confirm]" placeholder="Confirm Password" value={this.state.confirm}></input><br />
                    <input onChange={this.handleChange} type="email" id="email" name="user[email]" value={this.state.email} placeholder="Email"></input><br />
                    <input onChange={this.handleUpload} type="file" id="avatar" name="user[avatar]" />
                    <label for='bio'>User Bio:</label><br />
                    <textarea onChange={this.handleChange} name="user[bio]" id="bio" value={this.state.bio}></textarea><br />
                    <input type="submit" value="Sign Up"></input>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signupUser: (newUser, history) => dispatch(addUser(newUser, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));