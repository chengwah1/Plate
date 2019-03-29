import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {searchText: ''};
      }

    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.handleGetResult(this.state.searchText)
      }
    
    handleChange=(e)=> {
        this.setState({searchText: e.target.value});
    }

    render(){
        return (
            <header className="header">
                <img src="./img/logo.png" className="header__logo" alt="logo" />
                <form className="search" onSubmit={this.handleSubmit}>
                    <input type="text" 
                    className="search__field" 
                    placeholder="Search over 1,000,000 recipes..."
                    onChange={this.handleChange}/>
                    <button className="btn search__btn">
                        <svg className="search__icon">
                            <use href="img/icons.svg#icon-magnifying-glass"></use>
                        </svg>
                        <span>Search</span>
                    </button>
                </form>
                <div className="likes">
                <div className="likes__field">
                    <svg className="likes__icon">
                        <use href="img/icons.svg#icon-heart"></use>
                    </svg>
                </div>
                <div className="likes__panel">
                    <ul className="likes__list">
                        <li>
                            <a className="likes__link" href="#23456">
                                <figure className="likes__fig">
                                    <img src="/img/test-1.jpg" alt="Test" />
                                </figure>
                                <div className="likes__data">
                                    <h4 className="likes__name">Pasta with Tomato ...</h4>
                                    <p className="likes__author">The Pioneer Woman</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                </div>
          </header>
        );
    }
}
Header.propTypes = {
    handleGetResult: PropTypes.func.isRequired,
}

export default Header;