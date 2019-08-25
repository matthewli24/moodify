import React, { Component } from 'react';
import './moodSelector.css';
import EnergyBar from '../energyBar/energyBar';

import angryEmoji from '../../assets/angry.svg';
import sadEmoji from '../../assets/sad.svg';
import neutralEmoji from '../../assets/neutral.svg';
import happyEmoji from '../../assets/happy.svg';
import beautifulEmoji from '../../assets/beautiful.svg';

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

    let angryClass = this.state.selected[0] ? "angrySelected" : "angry"
    let sadClass = this.state.selected[1] ? "sadSelected" : "sad"
    let neutralClass = this.state.selected[2] ? "neutralSelected" : "neutral"
    let happyClass = this.state.selected[3] ? "happySelected" : "happy"
    let beautifulClass = this.state.selected[4] ? "beautifulSelected" : "beautiful"

    return (
      <div className="moodAndEnergyWrapper">

        <div className="selectorWrapper">
          <div className={angryClass} onClick={() => this.handleOnClick(0)}>
            <img className="emoji" src={angryEmoji} alt="angryEmoji"/>
          </div>
          <div className={sadClass} onClick={() => this.handleOnClick(1)}>
            <img className="emoji" src={sadEmoji} alt="sadEmoji"/>
          </div>
          <div className={neutralClass} onClick={() => this.handleOnClick(2)}>
            <img className="emoji" src={neutralEmoji} alt="neutralEmoji"/>
          </div>
          <div className={happyClass} onClick={() => this.handleOnClick(3)}>
            <img className="emoji" src={happyEmoji} alt="happyEmoji"/>
          </div>
          <div className={beautifulClass} onClick={() => this.handleOnClick(4)}>
            <img className="emoji" src={beautifulEmoji} alt="beautifulEmoji"/>
          </div>
        </div>

        {/* <EnergyBar mood={this.state.mood}
          onMoodSelect={this.props.onMoodSelect} /> */}

      </div>

    );
  }
}

export default MoodSelector;