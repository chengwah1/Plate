import React from 'react';

const Recipe__ingredients = (props)=>{
    return(
        <li className="recipe__item">
            <svg className="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div className="recipe__count">{props.el.count}</div>
            <div className="recipe__ingredient">
                <span className="recipe__unit">{props.el.unit}</span> {props.el.ingredient}
            </div>
        </li>
    );
}

export default Recipe__ingredients