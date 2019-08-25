import React, { Component } from 'react';
import './changeMoodSelector.css'

class ChangeMoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  handleOnClick = () => {
    if (this.state.toggle) {
      this.props.onMoodChange(true);
      this.setState({
        toggle: false
      })
    }
    else {
      this.props.onMoodChange(false);
      this.setState({
        toggle: true
      })
    }
  }

  render() {
    let mood = this.props.mood
    let currentMood = "";
    if (mood === 0) {
      currentMood = "angry"
    }
    else if (mood === 1) {
      currentMood = "sad"
    }
    else if (mood === 2) {
      currentMood = "neutral"
    }
    else if (mood === 3) {
      currentMood = "happy"
    }
    else if (mood === 4) {
      currentMood = "beautiful"
    }

    return (
      <div className="changeMoodSelectorWrapper">
        <div className={currentMood} onClick={this.handleOnClick}></div>
      </div>
    );
  }
}

export default ChangeMoodSelector;
