import React from 'react';
import {connect} from "react-redux";
import Api from "../../common/api-communication";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import OffersPaginatedGrid from "./OffersPaginatedGrid";
import {OFFERS} from "../../common/paths";

function OffersView(props) {

    const {dispatch, offers, currentLoadedSearch, currentPage, totalPages} = props;

    const loadOffers = (searchParams) => {
        dispatch(Api.getOffers(new URLSearchParams(searchParams)));
    };

    return (
        <>
            <OffersPaginatedGrid offers={offers} currentPage={currentPage} totalPages={totalPages} offerLinkBase={OFFERS}
                                currentLoadedSearch={currentLoadedSearch} loadOffers={loadOffers}/>
        </>
    );

}

OffersView.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            price: PropTypes.PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            status: PropTypes.string,
            ownerId: PropTypes.number,
            attachment: PropTypes.shape({
                name: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            }),
        }),
    ),
    currentPage: PropTypes.number,
    currentLoadedSearch: PropTypes.string,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
    currentLoadedSearch: state.offers.search
}))(withRouter(OffersView));
