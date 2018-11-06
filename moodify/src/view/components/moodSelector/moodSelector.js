import React, { Component } from 'react';
import './moodSelector.css';

class MoodSelector extends Component {
    render() {
      return (
        <div className="selectorWrapper">
            <div className="angry"></div>
            <div className="sad"></div>
            <div className="neutral"></div>
            <div className="happy"></div>
            <div className="beautiful"></div>
            <div className="box"></div>
        </div>
      );
    }
  }
  
  export default MoodSelector;