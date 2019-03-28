import React, { Component } from 'react';
import './Result.css';
import Result_item from './Result_item';

const Result = (props) => {
    return (
    <div className="results">
        <ul className="results__list">
            <Result_item/>

            <li>
                <a className="results__link" href="#76767">
                    <figure className="results__fig">
                        <img src="img/test-2.jpg" alt="Test"/>
                    </figure>
                    <div className="results__data">
                        <h4 className="results__name">Pasta Salad with ...</h4>
                        <p className="results__author">Spicy Perspective</p>
                    </div>
                </a>
            </li>

            <li>
                <a className="results__link" href="#85354">
                    <figure className="results__fig">
                        <img src="img/test-3.jpg" alt="Test"/>
                    </figure>
                    <div className="results__data">
                        <h4 className="results__name">Homemade Tomato ...</h4>
                        <p className="results__author">All Recipes</p>
                    </div>
                </a>
            </li>

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

export default Result;