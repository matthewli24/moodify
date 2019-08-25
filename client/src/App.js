import React, { Component } from 'react';
import Topbar from './components/topbar/topbar';
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

      

      </div>
    );
  }
}

export default App;