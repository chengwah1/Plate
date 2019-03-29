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
    currentPage:1,
    ingredients:[]
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
      const key = '53c7accd158fed22a9e3ca69fe08758b';
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

  getRecipe = async(id = "46943")=>{
    try {
      const key = '53c7accd158fed22a9e3ca69fe08758b';
      const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${id}`);
      const get_ingredients = res.data.recipe.ingredients;
      const newGet_ingredients = this.parseIngredients(get_ingredients);
      this.setState({ingredients:newGet_ingredients})
    }
    catch (err) {
        console.log(err);
        alert('Something went wrong :(')
    }
  }

  parseIngredients(ingToBeParse) {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = ingToBeParse.map(el => {
        // 1) Uniform units
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitsShort[i]);
        });

        // 2) Remove parentheses
        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        // 3) Parse ingredients into count, unit and ingredient
        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

        let objIng;
        if (unitIndex > -1) {
            // There is a unit
            // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
            // Ex. 4 cups, arrCount is [4]
            const arrCount = arrIng.slice(0, unitIndex);
            
            let count;
            if (arrCount.length === 1) {
                count = eval(arrIng[0].replace('-', '+'));
            } else {
                count = eval(arrIng.slice(0, unitIndex).join('+'));
            }

            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            };

        } else if (parseInt(arrIng[0], 10)) {
            // There is NO unit, but 1st element is number
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }
        } else if (unitIndex === -1) {
            // There is NO unit and NO number in 1st position
            objIng = {
                count: 1,
                unit: '',
                ingredient
            }
        }

        return objIng;
    });
    return newIngredients;
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
        setCurrentPage={this.setCurrentPage}
        getRecipe={this.getRecipe} />

        <Recipe 
        displayRecipe={this.state.result}
        isActive={this.state.isActive}
        displayIngredients={this.state.ingredients}
        />

        <Shopping/>
        </div>
      </div>
    );
  }
}

export default App;
