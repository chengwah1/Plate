import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props)=>{
    if(props.isLoading){
        return(
            <div className = "loader">
                <svg>
                    <use href= "img/icons.svg#icon-cw"></use>
                </svg>
            </div>
        )
    }
    return null;
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired
}
export default Loader;