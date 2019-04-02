import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Shopping_item extends Component {

    constructor(props) {
        super(props);
        this.state = {value:Math.ceil(props.ingredient_item.count*(props.serving/4))};
      }

    handleChange=(e)=>{
        if(e.target.value>0)
        this.setState({value:e.target.value})
        console.log(this.props.key)
    }

    render(){
        
        return (
            <li className="shopping__item">
                <div className="shopping__count">
                    <input type="number" 
                    value={this.state.value} 
                    step={this.props.ingredient_item.count}
                    onChange={this.handleChange}/>
                    <p>{this.props.ingredient_item.unit}</p>
                </div>
                <p className="shopping__description">{this.props.ingredient_item.ingredient}</p>
                <button className="shopping__delete btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
        );
    }
}




export default Shopping_item;