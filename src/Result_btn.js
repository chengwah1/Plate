import React from 'react';
import PropTypes from 'prop-types';


const Result_btn = (props) => {

    if (props.currentPage===1 && props.totalPages>1){
        return (
            <button className="btn-inline results__btn--next" onClick={()=>props.setCurrentPage('next')}>
                <span>Page {props.currentPage+1}</span>
                <svg className="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </button>
        );  
    }else if(props.currentPage<props.totalPages){
        return (
            <div>
                <button className="btn-inline results__btn--prev" onClick={()=>props.setCurrentPage('prev')}>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-left"></use>
                    </svg>
                    <span>Page {props.currentPage-1}</span>
                </button>
                <button className="btn-inline results__btn--next" onClick={()=>props.setCurrentPage('next')}>
                    <span>Page {props.currentPage+1}</span>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>
            </div>
        );
    }else if(props.currentPage===props.totalPages && props.totalPages>1){
        return (
            <button className="btn-inline results__btn--prev" onClick={()=>props.setCurrentPage('prev')}>
                <svg className="search__icon">
                    <use href="img/icons.svg#icon-triangle-left"></use>
                </svg>
                <span>Page {props.currentPage-1}</span>
            </button>
        );
    }else return null;

}

Result_btn.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,


}
export default Result_btn;
