import React from 'react';
import PropTypes from "prop-types";
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import {Link} from "react-router-dom";

function PaginationComponent({currentPage, currentPathname, totalPages}) {

    return (
        <Pagination
            page={currentPage}
            count={totalPages}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={currentPathname + '?' + new URLSearchParams({page: item.page}).toString()}
                    {...item}
                />
            )}
        />
    );
}

PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPathname: PropTypes.string.isRequired
};

export default PaginationComponent;