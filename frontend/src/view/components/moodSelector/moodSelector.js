import React, { Component } from 'react';
import './moodSelector.css';
import EnergyBar from '../energyBar/energyBar';

class MoodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: null,
      selected: [0, 0, 0, 0, 0]
    }
  }

  handleOnClick = (val) => {
    let newSelected = [0, 0, 0, 0, 0];
    newSelected[val] = 1;

    this.setState({
      mood: val,
      selected: newSelected
    })
  }

  render() {
    let angryClass= this.state.selected[0] ? "angrySelected" : "angry"
    let sadClass= this.state.selected[1] ? "sadSelected" : "sad"
    let neutralClass= this.state.selected[2] ? "neutralSelected" : "neutral"
    let happyClass= this.state.selected[3] ? "happySelected" : "happy"
    let beautifulClass= this.state.selected[4] ? "beautifulSelected" : "beautiful"
    return (
      <div className="moodAndEnergyWrapper">
        <div className="selectorWrapper">
            <div className={angryClass} onClick={() => this.handleOnClick(0)}></div>
            <div className={sadClass} onClick={() => this.handleOnClick(1)}></div>
            <div className={neutralClass} onClick={() => this.handleOnClick(2)}></div>
            <div className={happyClass} onClick={() => this.handleOnClick(3)}></div>
            <div className={beautifulClass} onClick={() => this.handleOnClick(4)}></div>
        </div>
        <EnergyBar mood={this.state.mood}/>
      </div>
      
    );
  }
}

export default MoodSelector;