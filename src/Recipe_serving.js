import React from 'react';


const Recipe_serving = (props)=>{
    const numIngredients = props.recipe.recipe.ingredients.length;
    const serving = props.serving
    const Liked = props.Liked()
    return(
            <div className="recipe__details">
            
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span className="recipe__info-data recipe__info-data--minutes">{numIngredients*5}</span>
                    <span className="recipe__info-text"> minutes</span>
                </div>
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span className="recipe__info-data recipe__info-data--people">{serving}</span>
                    <span className="recipe__info-text"> {serving>1?"servings":"serving"}</span>

                    <div className="recipe__info-buttons">
                        <button className="btn-tiny btn-minus" onClick={()=>props.handleServing('minus')}>
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button className="btn-tiny btn-plus" onClick={()=>props.handleServing('plus')}>
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>

                <button className="recipe__love" onClick={props.pushToLikeList}>
                    <svg className="header__likes">
                        <use href={Liked?"img/icons.svg#icon-heart":"img/icons.svg#icon-heart-outlined"}></use>
                    </svg>
                </button>
            </div>
    )
}
export default Recipe_serving;