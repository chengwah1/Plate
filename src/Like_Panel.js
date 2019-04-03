import React from 'react';

const Like_Panel = (props)=>{

    const handleGetRecipe=(e)=>{
        e.preventDefault();
        props.setActiveId(props.id)
    }
    return(
        <li>
            <a className="likes__link" href={props.id} onClick={handleGetRecipe}>
                <figure className="likes__fig">
                    <img src={props.image} alt={props.title} />
                </figure>
                <div className="likes__data">
                    <h4 className="likes__name">{props.title}</h4>
                    <p className="likes__author">{props.publisher}</p>
                </div>
            </a>
        </li>
    );
}

export default Like_Panel;