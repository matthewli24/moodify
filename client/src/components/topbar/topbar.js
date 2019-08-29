import React, { Component } from 'react';
import SpotifyIcon from '../../assets/spotifyIcon.svg'
import './topbar.css';

class Topbar extends Component {

  handleSignIn = () => {
    window.location = 'https://moodifysongs.firebaseapp.com/api/v1/auth/spotify';
  }

  // handleSigOut = () => {
  //   window.location = 'http://localhost:8000/auth/logout';
  // }

  render() {
    let username = this.props.username;
    let email = this.props.email;
    let button;
    if(username) {
      button = 
        <div className="signedIn">
          <div className="username">{username}</div>
          <button className="signOutBtn" onClick={this.handleSigOut}>Sign Out</button>
        </div>
    } else {
      button = <button className="signInBtn" onClick={this.handleSignIn}>Sign In/Sign Up</button>
    }

    return (
      <div className="topbarWrapper">
        <div className="topbarLogo">
          <div>Moodify</div>
        </div>

        <div className="topbarMessage">
          How Are You Feeling?
        </div>

        

        <div className="topbarUserLoggedIn">
          <img className="spotifyIcon" src={SpotifyIcon} alt="spotifyIcon"/>
          {button}
        </div>

      </div>
    );
  }
}

export default Topbar;