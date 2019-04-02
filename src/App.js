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
    addToShopping: false,
    serving:4
  }

  componentWillMount() {
    this.getResult();
  }

  controlToggle = (property) => {
    this.setState({[property]: !this.state.property})
  }
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
    if (this.state.isLoading===false) this.controlToggle('isLoading')
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
    }
  }

  handleServ=(type)=>{
    if(type === 'minus' && this.state.serving>0){
        this.setState(prevState => {return {serving:prevState.serving-1}})
    }else if(type === 'plus') this.setState(prevState => {return {serving:prevState.serving+1}})
  }
  setActiveId=(id)=>this.setState({isActive:id})
  
  handleAddToShopping=(Recipe)=>{
    this.Recipe = Recipe;
    console.log(666)
    if(this.state.addToShopping===false){this.controlToggle('addToShopping')}
    
  }
  deleteShoppingItem=()=>{

  }
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
        serving={this.state.serving}
        handleServing={this.handleServ}
        handleAddToShopping={this.handleAddToShopping}
        />

        <Shopping 
        addToShopping={this.state.addToShopping}
        toggleShopping={this.controlToggle}
        recipe_data={this.Recipe}
        serving={this.state.serving} />
        </div>
      </div>
    );
  }
}

export default App;
