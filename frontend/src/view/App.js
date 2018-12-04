import React, { Component } from 'react';
import Topbar from './components/topbar/topbar';
import MoodSelector from './components/moodSelector/moodSelector';
import PlayButton from './components/playButton/playButton';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      moodSelected: false,
      playlistURL: ""
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

  onMoodSelect = (selected, url) => {
    this.setState({
      moodSelected: selected,
      playlistURL: url
    })
  }

  render() {
    let moodSelection = this.state.moodSelected ? "" : <MoodSelector onMoodSelect={this.onMoodSelect} />
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
