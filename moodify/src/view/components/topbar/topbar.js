import React, { Component } from 'react';
import './topbar.css';

class Topbar extends Component {
    render() {
      return (
        <div className="wrapper">
            <div className="logo">
              <a>Moodify</a>
            </div>

            <div className="message">
              <a>How Are You Feeling Beautiful?</a>
            </div>

            <div className="userLog">
              <a>Log In</a>
              <a>Sign Up</a>
            </div>
        </div>
      );
    }
  }
  
  export default Topbar;