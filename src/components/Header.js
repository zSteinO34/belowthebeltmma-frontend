import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/userActions';
import Swal from 'sweetalert2';


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
        e.target[0].value = ''
        e.target[1].value = ''
        const history = this.props.history
        this.props.loginUser(user, history)
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
            title: 'Logged Out Successfully'
          })

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
                            <a href="/ufc">UFC</a>
                            <a href="/mma">MMA</a>
                            <a href="/bjj">Brazilian Jiu-Jitsu</a>
                            <a href="/boxing">Boxing</a>
                            <a href="/kickboxing">Kickboxing</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-btn">Other</button>
                        <div className="dropdown-content">
                            <a href="/gambling">Gambling</a>
                            <a href="/entertainment">Entertainment</a>
                            <a href="/misc">Misc.</a>
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
        loginUser: (user,history) => dispatch(loginUser(user, history)),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));