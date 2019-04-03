import React, { PureComponent } from 'react';
import './Recipe.css';
import Recipe__ingredients from './Recipe__ingredients';
import RecipeServing from './RecipeServing';
import Loader from './Loader';

class Recipe extends PureComponent{
    constructor(props){
        super(props)
    }
    
    render(){
        if(Object.entries(this.props.Recipe).length !== 0 && this.props.Recipe.constructor === Object && this.props.recipeIsLoading===false)
        return(
        <div className="recipe">
            <figure className="recipe__fig">
                <img src={this.props.Recipe.recipe.image_url} alt="Tomato" className="recipe__img"/>
                <h1 className="recipe__title">
                    <span>{this.props.Recipe.recipe.title}</span>
                </h1>
            </figure>
            <RecipeServing
            recipe={this.props.Recipe}
            serving={this.props.serving}
            handleServing={this.props.handleServing}
            pushToLikeList={this.props.pushToLikeList}
            Liked={this.props.Liked}
            likedList={this.props.likedList} />

            <div className="recipe__ingredients">
                <ul className="recipe__ingredient-list">
                    {this.props.Recipe.recipe.ingredients.map((el,index)=><Recipe__ingredients
                    el={el}
                    key={index}
                    serving={this.props.serving}
                    />)}
                </ul>

                <button className="btn-small recipe__btn" onClick={this.props.handleAddToShopping}>
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
                    <span className="recipe__by">{this.props.Recipe.recipe.publisher}</span>. Please check out directions at their website.
                </p>
                <a className="btn-small recipe__btn" href={this.props.Recipe.recipe.source_url} target="_blank" rel="noopener noreferrer">
                    <span>Directions</span>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
        </div>)
        else return <Loader />
    }
}  

export default Recipe;