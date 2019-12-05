import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getLoggedUser } from './actions/userActions'
import { fetchPosts } from './actions/postActions';
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
import PostView from './components/PostView';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import FilterPage from './components/FilterPage';

class App extends React.Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.getLoggedUser();
    }
  }

  checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    if(token) {
        return true
    } else {
      return false
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
            <Route path="/ufc">
              <FilterPage />
            </Route>
            <Route path="/mma">
              <FilterPage />
            </Route>
            <Route path="/bjj">
              <FilterPage />
            </Route>
            <Route path="/boxing">
              <FilterPage />
            </Route>
            <Route path="/kickboxing">
              <FilterPage />
            </Route>
            <Route path="/gambling">
              <FilterPage />
            </Route>
            <Route path="/entertainment">
              <FilterPage />
            </Route>
            <Route path="/misc">
              <FilterPage />
            </Route>
            <Route path="/post/:id/edit">
              <EditPost />
            </Route>
            <Route path="/post/:id">
              <PostView />
            </Route>
            <Route path="/new-post">
              <CreatePost />
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
      user: state.user,
      posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getLoggedUser: () => dispatch(getLoggedUser()),
      fetchInitialPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);