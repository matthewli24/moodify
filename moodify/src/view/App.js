import React, { Component } from 'react';
import Topbar from './components/topbar/topbar';
import MoodSelector from './components/moodSelector/moodSelector';
import PlayButton from './components/playButton/playButton';
import EnergyBar from './components/energyBar/energyBar';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className='container'>
        <Topbar/>
        <MoodSelector/>
        <EnergyBar/>
        <PlayButton/>
      </div>
    );
  }
}

export default App;
