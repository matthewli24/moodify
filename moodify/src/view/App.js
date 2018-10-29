import React, { Component } from 'react';
import Topbar from './components/topbar/topbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Topbar/>
      </div>
    );
  }
}

export default App;
