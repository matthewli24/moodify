import React, { Component } from 'react';
import './submitBtn.css'

class SubmitBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleOnClick = () => {
    let mood = this.props.mood;
    let energy = this.props.energy / 100;
    console.log(mood, energy)
    if (mood) {
      // do something
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