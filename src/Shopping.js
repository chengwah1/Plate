import React from 'react';
import './Shopping.css';
import Shopping_item from './Shopping_item'


const Shopping = (props) => {

    

    if(props.addToShopping.length>0){
        return (
            <div className="shopping">
                <h2 className="heading-2">My Shopping List</h2>
    
                <ul className="shopping__list">
                {props.addToShopping.map((el,index)=><Shopping_item
                ingredient_item={el}
                key={index}
                id={index}
                handleRemoveShoppingItem={props.deleteShoppingItem}
                />)}
                </ul>
    
                <div className="Powered-by">
                    Powered by
                    <a href="http://food2fork.com" target="_blank" className="link">Food2Fork.com</a>.
                </div>
    
            </div>
        )
    }else return (
        <div className="shopping">
            <h2 className="heading-2">My Shopping List</h2>

            <div className="Powered-by">
                Powered by
                <a href="http://food2fork.com" target="_blank" className="link">Food2Fork.com</a>.
            </div>

        </div>
    );

}

export default Shopping;