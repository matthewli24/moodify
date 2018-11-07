import React, { Component } from 'react';
import './playButton.css'

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:"https://open.spotify.com/embed/user/supermattmatt/playlist/4ONG7Bh2U9VneMkMdjGCL7"
    }
  }
  render() {
    return (
      <div className="playButtonWrapper">
          <iframe src={this.state.url}
                  width="65%" 
                  height="500" 
                  frameBorder="0" 
                  allowtransparency="true" 
                  allow="encrypted-media">
          </iframe>
      </div>
    );
  }
}

export default PlayButton;
