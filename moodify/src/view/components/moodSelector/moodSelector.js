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
    }):
    this.setState({
      mood: "angry",
      angrySelected: true
    })

  };

  selectSad = () => {
    (this.state.sadSelected) ?
    this.setState({
      mood: "",
      sadSelected: false
    }):
    this.setState({
      mood: "sad",
      sadSelected: true
    })
  };

  selectNeutral = () => {
    (this.state.neutralSelected) ?
    this.setState({
      mood: "",
      neutralSelected: false
    }):
    this.setState({
      mood: "neutral",
      neutralSelected: true
    })
  };

  selectHappy = () => {
    (this.state.happySelected) ?
    this.setState({
      mood: "",
      happySelected: false
    }):
    this.setState({
      mood: "happy",
      happySelected: true
    })
  };

  selectBeautiful = () => {
    (this.state.beautifulSelected) ?
    this.setState({
      mood: "",
      beautifulSelected: false
    }):
    this.setState({
      mood: "beautiful",
      beautifulSelected: true
    })
  };
  

  render() {
    let angryClass= this.state.angrySelected ? "angrySelected" : "angry"
    let sadClass= this.state.sadSelected ? "sadSelected" : "sad"
    let neutralClass= this.state.neutralSelected ? "neutralSelected" : "neutral"
    let happyClass= this.state.happySelected ? "happySelected" : "happy"
    let beautifulClass= this.state.beautifulSelected ? "beautifulSelected" : "beautiful"
    return (
      <div className="selectorWrapper">
          <div className={angryClass} onClick={this.selectAngry}></div>
          <div className={sadClass} onClick={this.selectSad}></div>
          <div className={neutralClass} onClick={this.selectNeutral}></div>
          <div className={happyClass} onClick={this.selectHappy}></div>
          <div className={beautifulClass} onClick={this.selectBeautiful}></div>
      </div>
    );
  }
}

export default MoodSelector;