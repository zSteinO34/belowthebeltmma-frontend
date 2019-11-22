import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getLoggedUser } from './actions/userActions'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header';
import TopPosts from './components/TopPosts';
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';

class App extends React.Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.getLoggedUser();
    }
  }

  render () {
    return (
      <Router>
        <div>
          <Header />
          
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/user-page">
              {this.props.user.isAdmin
              ?
                <AdminPage />
              :
                <UserPage />
              }
            </Route>
            <Route path="/">
              <TopPosts />
              <div className="home-content">
                <PostList />
                <Sidebar />
              </div>
            </Route>
          </Switch>

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
      user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getLoggedUser: () => dispatch(getLoggedUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);