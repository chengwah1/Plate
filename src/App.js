import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Result from './Results';
import Recipe from './Recipe';
import Shopping from './Shopping';
import axios from "axios";
import Loader from './Loader';


class App extends Component {
  state = {
    result:[],
    isLoading:true,
    isActive:"47746",
    currentPage:1,
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

  getResult = async(query)=>{
    if (this.state.isLoading===false) this.controlIsLoading()
    try {
      const key = '0b8a037fbe9ffb3d9385542037f69a63';
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
    }
  }
  
  setActiveId=(id)=>this.setState({isActive:id})
  
  render() {

    return (
      <div className="App">
        <div className="container">
        <Header handleGetResult={this.getResult}/>

        {this.state.isLoading?<Loader
        isLoading={this.state.isLoading}
        />:
        <Result 
        displaySearchResult={this.state.result} 
        isActive={this.state.isActive}
        setActiveId={this.setActiveId}
        currentPage={this.state.currentPage}
        setCurrentPage={this.setCurrentPage}
        />
        }

        <Recipe 
        isActive={this.state.isActive}
        />

        <Shopping/>
        </div>
      </div>
    );
  }
}

export default App;
