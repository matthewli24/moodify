import React, { Component } from 'react';
import './submitBtn.css'

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
      console.log("mood is not null")
      // fetch(`/spotify/playlist?mood=${mood}&energy=${energy}`)
      //   .then(res => res.json())
      //   .then(res => {
      //     this.setState({
      //       playlistURL: res
      //     })
      //   })
      //   .then(() => { console.log(this.state.playlistURL) })
      //   .then(() => { this.props.onMoodSelect(true, mood, this.state.playlistURL) })
      //   .catch((err) => {
      //     console.log("error fetching playlist: ", err)
      //   })

    } else {
      alert('PLEASE SELECT A MOOD!');
    }
  }

  render() {
    return (
      <div className="submitBtnWrapper">
        <button className="submitBtn" onClick={this.handleOnClick}>
          Moodify!
        </button>
      </div>
    );
  }
}

export default SubmitBtn;