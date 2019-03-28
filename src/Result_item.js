import React, { Component } from 'react';


const Result_item = (props) => {
    return (
            <li>
                <a className="results__link results__link--active" href="#23456">
                    <figure className="results__fig">
                        <img src="img/test-1.jpg" alt="Test"/>
                    </figure>
                    <div className="results__data">
                        <h4 className="results__name">Pasta with Tomato ...</h4>
                        <p className="results__author">The Pioneer Woman</p>
                    </div>
                </a>
            </li>

    );
}

export default Result_item;