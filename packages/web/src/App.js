import React, { Component } from 'react';
import { add } from '@yarn-workspace-cra-crna-expo-tut/common';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learning React is like learning 1 + 1 = {add(1, 1)}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
