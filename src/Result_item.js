import React from 'react';
import PropTypes from 'prop-types';


const Result_item = (props) => {
    
    const handleActiveId=(e)=>{
        e.preventDefault();
        props.setActiveId(props.item.recipe_id);
    }
    return (
            <li>
                <a className={props.item.recipe_id===props.isActive?"results__link results__link--active":"results__link"}
                href={props.item.recipe_id} onClick={handleActiveId}>
                    <figure className="results__fig">
                        <img src={props.item.image_url} alt={props.item.title}/>
                    </figure>
                    <div className="results__data">
                        <h4 className="results__name">{props.item.title}</h4>
                        <p className="results__author">{props.item.publisher}</p>
                    </div>
                </a>
            </li>
    );
}

Result_item.propTypes = {
    item: PropTypes.object.isRequired,
    isActive: PropTypes.string.isRequired,
    setActiveId: PropTypes.func.isRequired,
}
export default Result_item;