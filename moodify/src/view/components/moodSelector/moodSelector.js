import React, { Component } from 'react';
import './moodSelector.css';

class MoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: "",
      angrySelected: false,
      sadSelected: false,
      neutralSelected: false,
      happySelected: false,
      beautifulSelected: false
    }
  }

  selectAngry = () => {
    (this.state.angrySelected) ?
    this.setState({
      mood: "",
      angrySelected: false
    }) :
    this.setState({
      mood: "angry",
      angrySelected: true
    })

  };

  selectSad = () => {
    this.setState({
      mood: "sad",
      sadSelected: true
    })
  };

  selectNeutral = () => {
    this.setState({
      mood: "neutral",
      neutralSelected: true
    })
  };

  selectHappy = () => {
    this.setState({
      mood: "happy",
      happySelected: true
    })
  };

  selectBeautiful = () => {
    this.setState({
      mood: "beautiful",
      beautifulSelected: true
    })
  };
  

  render() {
    let angryClass= this.state.angrySelected ? "angrySelected" : "angry"
    return (
      <div className="selectorWrapper">
          <div className={angryClass} onClick={this.selectAngry}></div>
          <div className="sad" onClick={this.selectSad}></div>
          <div className="neutral" onClick={this.selectNeutral}></div>
          <div className="happy" onClick={this.selectHappy}></div>
          <div className="beautiful" onClick={this.selectBeautiful}></div>
      </div>
    );
  }
}

export default MoodSelector;