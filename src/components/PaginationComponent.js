import React from 'react';
import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";
import {LinkContainer} from 'react-router-bootstrap'

function PaginationComponent({currentPage, currentPathname, totalPages}) {

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        const href = currentPathname + '?' + new URLSearchParams({page: number}).toString();
        items.push(
            <LinkContainer key={number} to={href}>
                <Pagination.Item active={number === currentPage}>
                    {number}
                </Pagination.Item>
            </LinkContainer>
        );
    }

    return (
        <Pagination>{items}</Pagination>
    );
}

PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPathname: PropTypes.string.isRequired
};

export default PaginationComponent;