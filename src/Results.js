import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import Result_item from './Result_item';
import Loader from './Loader';

const Result = (props) => {
    return (
    <div className="results">
        <ul className="results__list">
            <Loader controlIsLoading={props.controlIsLoading} isLoading={props.isLoading}/>
            {props.displaySearchResult.map((item,index)=><Result_item
            item={item}
            key={index}
            />)}

        </ul>

        <div className="results__pages">

            <button className="btn-inline results__btn--prev">
                <svg className="search__icon">
                    <use href="img/icons.svg#icon-triangle-left"></use>
                </svg>
                <span>Page 1</span>
            </button>
            <button className="btn-inline results__btn--next">
                <span>Page 3</span>
                <svg className="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </button>

        </div>
    </div>

    );
}

Result.propTypes = {
    displaySearchResult: PropTypes.array.isRequired,
    controlIsLoading: PropTypes.func,
    isLoading: PropTypes.bool.isRequired
}
export default Result;