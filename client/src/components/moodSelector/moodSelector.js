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
    let newSelectedState = [0, 0, 0, 0, 0];

    if(val === this.state.mood) {
      this.setState({
        mood: null,
        selected: newSelectedState
      })
    } else {
      newSelectedState[val] = 1;
      this.setState({
        mood: val,
        selected: newSelectedState
      })
    }
  }

  render() {

    let angryClass = this.state.selected[0] ? "selected" : "emoji"
    let sadClass = this.state.selected[1] ? "selected" : "emoji"
    let neutralClass = this.state.selected[2] ? "selected" : "emoji"
    let happyClass = this.state.selected[3] ? "selected" : "emoji"
    let beautifulClass = this.state.selected[4] ? "selected" : "emoji"

    return (
      <div className="moodAndEnergyWrapper">

        <div className="selectorWrapper">
          <div onClick={() => this.handleOnClick(0)}>
            <img className={angryClass} src={angryEmoji} alt="angryEmoji"/>
          </div>
          <div onClick={() => this.handleOnClick(1)}>
            <img className={sadClass} src={sadEmoji} alt="sadEmoji"/>
          </div>
          <div onClick={() => this.handleOnClick(2)}>
            <img className={neutralClass} src={neutralEmoji} alt="neutralEmoji"/>
          </div>
          <div onClick={() => this.handleOnClick(3)}>
            <img className={happyClass} src={happyEmoji} alt="happyEmoji"/>
          </div>
          <div onClick={() => this.handleOnClick(4)}>
            <img className={beautifulClass} src={beautifulEmoji} alt="beautifulEmoji"/>
          </div>

        </div>

        {/* <EnergyBar mood={this.state.mood}
          onMoodSelect={this.props.onMoodSelect} /> */}

      </div>

    );
  }
}

export default MoodSelector;