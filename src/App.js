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
    recipe:{},
    isLoading:true,
    isActive:"47746",
    currentPage:1,
    addToShopping: [],
    serving:4,
    recipeIsLoading:true
  }

  componentWillMount() {
    this.getResult();
    this.getRecipe(this.props.isActive);
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
  getRecipe = async(id='47032')=>{
    if (this.state.recipeIsLoading===false) this.controlToggle('recipeIsLoading')
    try {
      const key = '0b8a037fbe9ffb3d9385542037f69a63';
      const res = await axios.get(`https://www.food2fork.com/api/get?key=${key}&rId=${id}`);
      console.log(`gotten result ${res.data}`)
      
        const get_ingredients = res.data.recipe.ingredients;
        const newGet_ingredients = this.parseIngredients(get_ingredients);
        res.data.recipe.ingredients = newGet_ingredients;
        this.setState({
            recipe:res.data,
            isActive:id,
            recipeIsLoading:false
        })
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

  handleServ=(type)=>{
    if(type === 'minus' && this.state.serving>0){
        this.setState(prevState => {return {serving:prevState.serving-1}})
    }else if(type === 'plus') this.setState(prevState => {return {serving:prevState.serving+1}})
  }
  setActiveId=(id)=>{
    this.getRecipe(id)
  }
  
  handleAddToShopping = () => {
    this.setState(prevState => {
      if(prevState.isActive!==this.state.isActive)
        return {
            addToShopping: [...prevState.recipe.recipe.ingredients.map(el => ({
                ...el,
                count: el.count * (prevState.serving / 4)
            })),...prevState.addToShopping]
        }
    })
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
        Recipe={this.state.recipe}
        recipeIsLoading={this.state.recipeIsLoading}
        isActive={this.state.isActive}
        serving={this.state.serving}
        handleServing={this.handleServ}
        handleAddToShopping={this.handleAddToShopping}
        />

        {/* <Shopping 
        addToShopping={this.state.addToShopping}
        toggleShopping={this.controlToggle}
        recipe_data={this.Recipe}
        serving={this.state.serving} /> */}
        </div>
      </div>
    );
  }
}

export default App;
