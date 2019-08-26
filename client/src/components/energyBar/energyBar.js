import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './energyBar.css';
import SubmitBtn from '../submitBtn/submitBtn';


class EnergyBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    }
  }

  handleOnChange = (val) => {
    this.setState({
      value: val
    })
  }

  render() {
    return (
      <div className="energyBarWrapper">
        <div className="lowEnergy">Low Energy</div>
       
        <Slider
          className="slider"
          value={this.state.value}
          onChange={this.handleOnChange}
          handleStyle={{
            borderColor: 'black',
            height: 50,
            width: 50,
            marginLeft: -14,
            marginTop: -12,
            backgroundColor: 'yellow',
          }}
          trackStyle={{ backgroundColor: 'red', height: 25 }}
          railStyle={{ backgroundColor: 'black', height: 25 }}
        />
       
        <div className="highEnergy">High Energy</div>
      </div>


    );
  }
}

export default EnergyBar;