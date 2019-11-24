import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addUser } from '../actions/userActions';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        confirm: '',
        email: '',
        isAdmin: false,
        bio: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            isAdmin: false,
            bio: this.state.bio
        }
        if(this.state.password === this.state.confirm) {
            this.props.signupUser(newUser)
            this.props.history.push('/user-page')
        } else {
            alert("Password and Confirm Password need to match");
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    render () {
        return (
            <div className="signup-page">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" id="username" name="user[username]" value={this.state.username} placeholder="Username"></input><br />
                    <input onChange={this.handleChange} type="password" id="password" name="user[password]" value={this.state.password} placeholder="Password"></input><br />
                    <input onChange={this.handleChange} type="password" id="confirm" name="user[confirm]" placeholder="Confirm Password"></input><br />
                    <input onChange={this.handleChange} type="email" id="email" name="user[email]" value={this.state.email} placeholder="Email"></input><br />
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
        signupUser: (newUser) => dispatch(addUser(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));