import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Result from './Results';
import Recipe from './Recipe';
import Shopping from './Shopping';
import axios from "axios";

class App extends Component {
  state = {
    result:[],
    isLoading:false
  }

  componentWillMount() {
    this.getResult();
  }

  controlIsLoading = () => this.setState({isLoading: !this.state.isLoading})

  getResult = async(query='pasta')=>{
    this.setState({result:[]})
    this.controlIsLoading()
    try {
      const key = '280a7ce696849503c24e83daf3999460';
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
      const resu = res.data.recipes;
      // console.log(result)
      this.setState({
        result: resu
      })
      this.controlIsLoading()
    }
    catch (err) {
        alert(err);
        this.controlIsLoading()
    }
  }



  render() {
    return (
      <div className="App">
        <div className="container">
        <Header handleGetResult={this.getResult}/>
        <Result 
        displaySearchResult={this.state.result} 
        controlIsLoading={this.controlIsLoading}
        isLoading={this.state.isLoading}/>
        <Recipe/>
        <Shopping/>
        </div>
      </div>
    );
  }
}

export default App;
