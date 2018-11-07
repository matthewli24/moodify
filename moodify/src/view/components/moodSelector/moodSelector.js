import React, { Component } from 'react';
import './moodSelector.css';

class MoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: "neutral"
    }
  }

  selectAngry = () => {
    this.setState({
      mood: "angry"
    })
  };

  selectSad = () => {
    this.setState({
      mood: "sad"
    })
  };

  selectNeutral = () => {
    this.setState({
      mood: "neutral"
    })
  };

  selectHappy = () => {
    this.setState({
      mood: "happy"
    })
  };

  selectBeautiful = () => {
    this.setState({
      mood: "beautiful"
    })
  };
  

  render() {
    return (
      <div className="selectorWrapper">
          <div className="angry" onClick={this.selectAngry}></div>
          <div className="sad" onClick={this.selectSad}></div>
          <div className="neutral" onClick={this.selectNeutral}></div>
          <div className="happy" onClick={this.selectHappy}></div>
          <div className="beautiful" onClick={this.selectBeautiful}></div>
      </div>
    );
  }
}

export default MoodSelector;