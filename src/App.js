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
    isLoading:true,
    isActive:"",
    currentPage:1
  }

  componentWillMount() {
    this.getResult();
  }

  controlIsLoading = () => this.setState({isLoading: !this.state.isLoading})
  // updating state based on prevstate 
  // to avoid state inconsistent 
  setCurrentPage = (type)=> {
    if(type === 'next'){
      this.setState(prevState =>{
        return {
          currentPage: prevState.currentPage+1
        };
      })
    }else if(type === 'prev'){
      this.setState(prevState =>{
        return {
          currentPage: prevState.currentPage-1
        };
      })
    }
  }

  getResult = async(query='pasta')=>{
    this.setState({result:[]})
    if (this.state.isLoading===false) this.controlIsLoading()
    try {
      const key = '52d58ed2ebe261a2ea3a0abdd36d58f9';
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
      const resu = res.data.recipes;
      // console.log(result)
      this.setState({
        result: resu,
        isLoading:false
      })
      
    }
    catch (err) {
        alert(err);
        this.controlIsLoading()
    }
  }

  setActiveId=(id)=>this.setState({isActive:id})
  
  render() {
    return (
      <div className="App">
        <div className="container">
        <Header handleGetResult={this.getResult}/>

        <Result 
        displaySearchResult={this.state.result} 
        controlIsLoading={this.controlIsLoading}
        isLoading={this.state.isLoading}
        isActive={this.state.isActive}
        setActiveId={this.setActiveId}
        currentPage={this.state.currentPage}
        setCurrentPage={this.setCurrentPage} />
        
        <Recipe/>

        <Shopping/>
        </div>
      </div>
    );
  }
}

export default App;
