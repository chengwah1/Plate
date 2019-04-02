import React, { PureComponent } from 'react';
import './Recipe.css';
import Recipe__ingredients from './Recipe__ingredients';
import Recipe_serving from './Recipe_serving';
import Loader from './Loader';
import axios from "axios";

class Recipe extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
        }
    }
    componentWillMount(){
        this.getRecipe(this.props.isActive);
    }
    componentDidUpdate(prevProps){
        console.log(`component did update ${this.props.isActive}`)
        if(prevProps.isActive !== this.props.isActive){
            this.getRecipe(this.props.isActive);
            console.log(`calling api ${this.props.isActive}`)
        }
           
    }
    handleIsLoading(){
        this.setState({isLoading: !this.state.isLoading})
    }
    getRecipe = async(id='47032')=>{
        if (this.state.isLoading===false) this.handleIsLoading()
        try {
          const key = '52d58ed2ebe261a2ea3a0abdd36d58f9';
          const res = await axios.get(`https://www.food2fork.com/api/get?key=${key}&rId=${id}`);
          console.log(`gotten result ${res.data}`)
          
            const get_ingredients = res.data.recipe.ingredients;
            const newGet_ingredients = this.parseIngredients(get_ingredients);
            res.data.recipe.ingredients = newGet_ingredients;
            this.Recipe = res.data
            this.setState({
                isLoading:false
            })
            console.log(`state is ${this.state.isLoading}`)
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
    passIngredientUp=()=>{
        // calladtoshopping passing this.Recipe
        this.props.handleAddToShopping(this.Recipe)
    }
    
    render(){
        console.log(`trying to render : ${this.Recipe}`)
        console.log(this.Recipe)
        if(!this.state.isLoading)
        return(
        <div className="recipe">
            <figure className="recipe__fig">
                <img src={this.Recipe.recipe.image_url} alt="Tomato" className="recipe__img"/>
                <h1 className="recipe__title">
                    <span>{this.Recipe.recipe.title}</span>
                </h1>
            </figure>
            <Recipe_serving
            recipe={this.Recipe}
            serving={this.props.serving}
            handleServing={this.props.handleServing} />

            <div className="recipe__ingredients">
                <ul className="recipe__ingredient-list">
                    {this.Recipe.recipe.ingredients.map((el,index)=><Recipe__ingredients
                    el={el}
                    key={index}
                    serving={this.props.serving}
                    />)}
                </ul>

                <button className="btn-small recipe__btn" onClick={this.passIngredientUp}>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div className="recipe__directions">
                <h2 className="heading-2">How to cook it</h2>
                <p className="recipe__directions-text">
                    This recipe was carefully designed and tested by 
                    <span className="recipe__by">{this.Recipe.recipe.publisher}</span>. Please check out directions at their website.
                </p>
                <a className="btn-small recipe__btn" href={this.Recipe.recipe.source_url} target="_blank">
                    <span>Directions</span>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
        </div>)
        else return <Loader isLoading={this.state.isLoading}/>
    }
}  

export default Recipe;