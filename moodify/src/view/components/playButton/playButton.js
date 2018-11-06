import React, { Component } from 'react';
import './playButton.css'

class PlayButton extends Component {
    render() {
      return (
        <div className="playButtonWrapper">
            <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" 
                    width="500" height="500" frameborder="0" 
                    allowtransparency="true" allow="encrypted-media">
            </iframe>
        </div>
      );
    }
  }
  
  export default PlayButton;
