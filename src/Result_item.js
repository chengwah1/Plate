import React from 'react';
import PropTypes from 'prop-types';


const Result_item = (props) => {
    return (
            <li>
                <a className="results__link results__link--active" href={props.item.recipe_id}>
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
}
export default Result_item;