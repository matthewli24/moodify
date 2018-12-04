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

  render() {
    return (
      <div className='container'>
        <Topbar
          username={this.state.username}
          email={this.state.email}
        />
        <MoodSelector />
      </div>
    );
  }
}

export default App;
