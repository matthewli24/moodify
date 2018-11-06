import React, { Component } from 'react';
import './playButton.css'

class PlayButton extends Component {
    render() {
      return (
        <div className="playButtonWrapper">
            <iframe src="https://open.spotify.com/embed/user/metroboominofficial/playlist/3t20xdlYb1m6JpHZw8U2YE" 
                    width="65%" 
                    height="500" 
                    frameborder="0" 
                    allowtransparency="true" 
                    allow="encrypted-media">
            </iframe>
        </div>
      );
    }
  }

  
export default PlayButton;
