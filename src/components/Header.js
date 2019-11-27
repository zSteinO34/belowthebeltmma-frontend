import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/userActions';


class Header extends React.Component {
    state = {
        username: '',
        password: ''
    }
    
    handleLoginSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginUser(user);
        this.props.history.push('/user-page');
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSignupBtn = () => {
        this.props.history.push("/signup");
    }

    handleLogoutBtn = () => {
        localStorage.removeItem("token");
        this.props.logoutUser();
        this.props.history.push('/');

    }

    checkLoggedIn = () => {
        const token = localStorage.getItem("token");
        if(token) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <nav>
               <div className="navbar">
                    <a href="/"><img src="/below-the-belt-logo.jpg" alt="Logo" /></a>
                    { this.checkLoggedIn() 
                    ? 
                    <div className="login-action-nav">
                        <a href="/user-page">{this.props.user.username} <i className="fas fa-user-circle"></i></a>
                        <button className="solo-nav-btn" onClick={this.handleLogoutBtn}>Logout</button> 
                    </div>
                    :
                    <div className="login-action-nav">
                        <form onSubmit={this.handleLoginSubmit}>
                            <input onChange={this.handleChange} type="text" name="username" placeholder="username"></input>
                            <input onChange={this.handleChange} type="password" name="password" placeholder="password"></input>
                            <input type="submit" value="Log In"></input>
                        </form>
                        <button className="solo-nav-btn" onClick={this.handleSignupBtn}>Sign Up</button>
                    </div>
                    }

                        
                    <div className="dropdown">
                        <button className="dropdown-btn">Sports</button>
                        <div className="dropdown-content">
                            <a href="/">UFC</a>
                            <a href="/">MMA</a>
                            <a href="/">BJJ</a>
                            <a href="/">Boxing</a>
                            <a href="/">Kickboxing</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-btn">Other</button>
                        <div className="dropdown-content">
                            <a href="/">Gambling</a>
                            <a href="/">Entertainment</a>
                            <a href="/">Misc.</a>
                        </div>
                    </div>
                    <button className="solo-nav-btn">Shop</button>
               </div>
            </nav>
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
        loginUser: (user) => dispatch(loginUser(user)),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));