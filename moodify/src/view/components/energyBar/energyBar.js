import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import Background from '../../assets/1_.png'
import 'rc-slider/assets/index.css';
import './energyBar.css';


class EnergyBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    }
  }
  
  handleOnChange = (val) => {
    console.log(val)
    this.setState({
      value: val
    })
  }
  
  render() {
    return (
      <div className="energyBarWrapper">
        <div className="lowEnergy">Low</div>
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
              backgroundColor: 'red',
            }}
            trackStyle={{ backgroundColor: 'green', height: 25 }}
            railStyle={{ backgroundColor: 'yellow', height: 25 }}
            />
        </div>
        <div className="highEnergy">High</div>
      </div>
    );
  }
}

export default EnergyBar;