import React, { Component } from 'react';
import Topbar from './components/topbar/topbar';
import MoodSelector from './components/moodSelector/moodSelector'
import EnergyBar from './components/energyBar/energyBar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      moodSelected: false,
      playlistURL: "",
      mood: null
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='appContainer'>
        <Topbar
          username={this.state.username}
          email={this.state.email}
        />

        <MoodSelector />

        <EnergyBar />

      </div>
    );
  }
}

export default App;