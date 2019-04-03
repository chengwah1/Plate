import React, { Component } from 'react';
import './Header.css';
import Like_Panel from './Like_Panel';
import PropTypes from 'prop-types';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {searchText: ''};
      }

    handleSubmit=(e)=> {
        e.preventDefault();
        this.props.handleGetResult(this.state.searchText)
        this.setState({
            searchText:''
        })
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
                    onChange={this.handleChange}
                    value={this.state.searchText}/>
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
                            <use href="img/icons.svg#icon-heart" style={{visibility: this.props.likedList.length>0? 'visible' : 'hidden' }}></use>
                        </svg>
                    </div>
                    <div className="likes__panel">
                        <ul className="likes__list">
                            {this.props.likedList.map(el=><Like_Panel
                            image={el.recipe.image_url}
                            publisher={el.recipe.publisher}
                            title={el.recipe.title}
                            id={el.recipe.recipe_id}
                            key={el.recipe.recipe_id}
                            setActiveId={this.props.setActiveId} />)}
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