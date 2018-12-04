import React, { Component } from 'react';
import './submitBtn.css'
import PlayButton from '../playButton/playButton';

class SubmitBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistURL: ""
    }
  }

  handleOnClick = () => {
    let mood = this.props.mood;
    let energy = this.props.energy / 100;
    console.log(mood, energy)
    if (mood != null) {
      fetch(`/playlist?mood=${mood}&energy=${energy}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            playlistURL: res.playlistURL
          })
        })
        .then( ()=> {console.log(this.state.playlistURL)})
        .catch((err) => {
          console.log("error found: ", err)
        })
    } else {
      alert('PLEASE SELECT A MOOD!');
    }
  }

  render() {
    return (
      <div>
        <div className="submitBtnWrapper">
          <button className="submitBtn" onClick={this.handleOnClick}>
            Moodify!
        </button>
        </div>
        <PlayButton playlistURL={this.state.playlistURL} />
      </div>
    );
  }
}

export default SubmitBtn;