import React, { Component } from 'react';
import './Result.css';
import Result_item from './Result_item';

const Result = (props) => {
    return (
    <div class="results">
        <ul class="results__list">
            <Result_item/>

            <li>
                <a class="results__link results__link--active" href="#23456">
                    <figure class="results__fig">
                        <img src="img/test-1.jpg" alt="Test"/>
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">Pasta with Tomato ...</h4>
                        <p class="results__author">The Pioneer Woman</p>
                    </div>
                </a>
            </li>

            <li>
                <a class="results__link" href="#76767">
                    <figure class="results__fig">
                        <img src="img/test-2.jpg" alt="Test"/>
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">Pasta Salad with ...</h4>
                        <p class="results__author">Spicy Perspective</p>
                    </div>
                </a>
            </li>

            <li>
                <a class="results__link" href="#85354">
                    <figure class="results__fig">
                        <img src="img/test-3.jpg" alt="Test"/>
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">Homemade Tomato ...</h4>
                        <p class="results__author">All Recipes</p>
                    </div>
                </a>
            </li>

        </ul>

        <div class="results__pages">

            <button class="btn-inline results__btn--prev">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-left"></use>
                </svg>
                <span>Page 1</span>
            </button>
            <button class="btn-inline results__btn--next">
                <span>Page 3</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </button>

        </div>
    </div>

    );
}

export default Result;