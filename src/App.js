import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Result from './Results';
import Recipe from './Recipe';
import Shopping from './Shopping';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
        <Header/>
        <Result/>
        <Recipe/>
        <Shopping/>
        </div>
      </div>
    );
  }
}

export default App;
