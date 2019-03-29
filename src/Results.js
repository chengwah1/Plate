import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import Result_item from './Result_item';
import Loader from './Loader';
import Result_btn from './Result_btn';

const Result = (props) => {

    const resPerPage = 10;
    const indexStart = (props.currentPage-1)*resPerPage;
    const indexEnd = (props.currentPage)*resPerPage;
    const totalPages = Math.ceil(props.displaySearchResult.length/resPerPage);

    return (
    <div className="results">
        <ul className="results__list">
            <Loader controlIsLoading={props.controlIsLoading} isLoading={props.isLoading}/>
            {props.displaySearchResult.slice(indexStart,indexEnd).map((item,index)=><Result_item
            item={item}
            key={index}
            isActive={props.isActive}
            setActiveId={props.setActiveId}
            />)}
        </ul>

        <div className="results__pages">
            <Result_btn 
            totalPages={totalPages}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage} />
        </div>
    </div>

    );
}

Result.propTypes = {
    displaySearchResult: PropTypes.array.isRequired,
    controlIsLoading: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    isActive: PropTypes.string.isRequired,
    setActiveId: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
}
export default Result;