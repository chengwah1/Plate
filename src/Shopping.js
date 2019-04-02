import React from 'react';
import './Shopping.css';
import Shopping_item from './Shopping_item'


const Shopping = (props) => {
    console.log(props.recipe_data)
    console.log(`this is add to shopping bool ${props.addToShopping}`)
    if(props.addToShopping && props.recipe_data){
        return (
            <div className="shopping">
                <h2 className="heading-2">My Shopping List</h2>
    
                <ul className="shopping__list">
                {props.recipe_data.recipe.ingredients.map((el,index)=><Shopping_item
                ingredient_item={el}
                key={index} 
                serving={props.serving}/>)}
                </ul>
    
                <div className="Powered-by">
                    Powered by
                    <a href="http://food2fork.com" target="_blank" className="link">Food2Fork.com</a>.
                </div>
    
            </div>
        )
    }else return null;

}

export default Shopping;