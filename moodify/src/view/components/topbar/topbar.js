import React, { Component } from 'react';
import './topbar.css';

class Topbar extends Component {
    render() {
      return (
        <div className="topbarWrapper">
            <div className="topbarLogo">
              <a>Moodify</a>
            </div>

            <div className="topbarMessage">
              <a>How Are You Feeling?</a>
            </div>

            <div className="topbarUserLog">
              <a>Log In</a>
              <a>Sign Up</a>
            </div>
        </div>
      );
    }
  }
  
  export default Topbar;