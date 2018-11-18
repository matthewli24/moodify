import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
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
    // console.log(val)
    this.setState({
      value: val
    })
  }
  
  render() {
    return (
      <div className="energyAndBtnWrapper">
        <div className="energyBarWrapper">
          <div className="lowEnergy">Low Energy</div>
          <div className="slider">
            <Slider 
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
          </div>
          <div className="highEnergy">High Energy</div>
        </div>
        <SubmitBtn
          mood={this.props.mood}
          energy={this.state.value}
        />
      </div>
    );
  }
}

export default EnergyBar;