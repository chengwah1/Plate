import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Shopping_item extends Component {

    constructor(props) {
        super(props);
        this.state = {value:this.props.ingredient_item.count};
      }

    handleChange=(e)=>{
        if(e.target.value>0)
        this.setState({value:e.target.value})
    }

    render(){
        
        return (
            <li className="shopping__item">
                <div className="shopping__count">
                    <input type="number" 
                    value={this.state.value} 
                    step={0.25}
                    onChange={this.handleChange}/>
                    <p>{this.props.ingredient_item.unit}</p>
                </div>
                <p className="shopping__description">{this.props.ingredient_item.ingredient}</p>
                <button className="shopping__delete btn-tiny" onClick={()=>this.props.handleRemoveShoppingItem(this.props.id)}>
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
        );
    }
}




export default Shopping_item;