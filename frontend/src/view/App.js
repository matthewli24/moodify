import React, { Component } from 'react';
import Topbar from './components/topbar/topbar';
import MoodSelector from './components/moodSelector/moodSelector';
import PlayButton from './components/playButton/playButton';
import ChangeMoodSelector from './components/changeMoodSelector/changeMoodSelector';
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
    fetch('/users')
      .then(res => res.json())
      .then(res => {
        this.setState({
          username: res.id,
          email: res.email
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onMoodSelect = (selected, currentMood, url) => {
    this.setState({
      moodSelected: selected,
      playlistURL: url,
      mood: currentMood
    })
  }

  onMoodChange = (selected) => {
    this.setState({
      moodSelected: selected
    })
  }

  render() {
    let moodSelection = this.state.moodSelected ? <ChangeMoodSelector mood={this.state.mood} onMoodChange={this.onMoodChange}/> :
                                                  <MoodSelector onMoodSelect={this.onMoodSelect} />
    return (
      <div className='container'>
        <Topbar
          username={this.state.username}
          email={this.state.email}
        />
        {moodSelection}
        <PlayButton playlistURL={this.state.playlistURL} />
      </div>
    );
  }
}

export default App;
