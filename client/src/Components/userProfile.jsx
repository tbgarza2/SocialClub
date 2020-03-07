/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './Home.jsx';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.State = {
      user: '',
      userName: '',
    };
    this.signOut = this.signOut.bind(this);
  }

  // UNSAFE_componentWillMount() {
  //   if (localStorage.getItem('user')) {
  //     this.setState({
  //       user: JSON.parse(localStorage.getItem('user')),
  //       userName: JSON.parse(localStorage.getItem('userName')),
  //     });
  //   }
  // }

  // componentDidMount() {
  //   if (!localStorage.getItem('user')) {
  //     this.setState({
  //       user: this.props.user,
  //       userName: this.props.userName,
  //     });
  //   }
  // }

  // UNSAFE_componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem('user', JSON.stringify(nextState.user));
  //   localStorage.setItem('userName', JSON.stringify(nextState.userName));
  // }

  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      alert('You have been successfully signed out');
      $('.g-signin2').css('display', 'block');
      $('.profileRender').css('display', 'none');
    });
    localStorage.clear();
  }

  render() {
    const user = this.props.user || this.state.user;
    const userName = this.props.userName || this.state.userName;

    return (
      <div className="profileRender">
        <img id="pic" className="img-circle" width="100" height="100" src={user.profileObj.imageUrl} />
        <h2 className="emailAddy"> Welcome Back {userName}!</h2>
        <div id="email" className="col-sm-4"> {user.profileObj.email}</div>
        <div id="name" className="col-sm-4"> {user.profileObj.name}</div>
        <div id="id" className="col-sm-4"> {user.profileObj.googleId}</div>
        <Link to="/">
          <button className="dangerButton" onClick={this.signOut}>Sign Out</button>
        </Link>
        {/* {appView} */}
      </div>
    );
  }
}
export default UserProfile;
