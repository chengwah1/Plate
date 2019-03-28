import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Result from './Results';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
        <Header/>
        <Result/>
        </div>
      </div>
    );
  }
}

export default App;
