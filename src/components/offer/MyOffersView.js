import React from 'react';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FETCH_MY_OFFERS} from "../../redux/actions";
import {withRouter} from 'react-router-dom';
import OffersPaginatedGrid from "./OffersPaginatedGrid";

function MyOffersView(props) {

    const {dispatch, offers, currentPage, totalPages, userId, currentLoadedSearch} = props;

    const loadOffers = (search) => {
        const searchParams = new URLSearchParams(search);
        dispatch(Api.getMyOffers(searchParams.get('page')-1, userId, FETCH_MY_OFFERS));
    };

    return (
        <>
            <OffersPaginatedGrid myOffers={true} offers={offers} currentPage={currentPage} totalPages={totalPages}
                                 currentLoadedSearch={currentLoadedSearch} loadOffers={loadOffers}/>
        </>
    );
}

MyOffersView.propTypes = {
    userId: PropTypes.number.isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired
        }),
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    userId: state.me.id,
    offers: state.myoffers.content,
    currentPage: state.myoffers.currentPage,
    totalPages: state.myoffers.totalPages,
    currentLoadedSearch: state.myoffers.search
}))(withRouter(MyOffersView));
