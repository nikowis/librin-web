import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";
import LoaderComponent from "../LoaderComponent";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import PaginationComponent from "../PaginationComponent";
import OffersGrid from "./OffersGrid";
import { connect } from 'react-redux';
import { objectEquals } from '../../common/object-helper';
import { CHANGE_OFFERS_FILTER } from '../../redux/actions';

function OffersPaginatedGrid(props) {

    const {t} = useTranslation();
    const {offers, location, history, currentPage, totalPages, myOffers, currentFilter, newFilter, dispatch} = props;
    const {search, pathname} = location;
    const {replace} = history;

    const pageQuery = Api.getPageParam(search);

    useEffect(() => {
        if (isNaN(parseInt(pageQuery))) {
            const urlSearchParams = new URLSearchParams(search);
            urlSearchParams.set('page', 1);
            replace({
                pathname: pathname,
                search: "?" + urlSearchParams.toString()
            })
        } else if(newFilter.page !== pageQuery-1){
            dispatch({
                type: CHANGE_OFFERS_FILTER
                , payload: {page: pageQuery-1}
            });
        } else if (!objectEquals(currentFilter, newFilter)) {
            dispatch(Api.getOffers(newFilter));
        } 
    }, [replace, dispatch, pathname, search, pageQuery, currentFilter, newFilter]);

    const getView = () => {
        return <>
            {pageQuery <= totalPages ?
                <>
                    <OffersGrid myOffers={myOffers} offers={offers} offerLinkBase={props.offerLinkBase}/>
                    <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
                </>
                : t('noElementsFound')}
        </>
    };

    return (
        <>
            {offers === null ? <LoaderComponent/> : getView()}
        </>
    );

}

OffersPaginatedGrid.propTypes = {
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
    totalPages: PropTypes.number,
    myOffers: PropTypes.bool,
    offerLinkBase: PropTypes.string.isRequired,
    currentFilter: PropTypes.object.isRequired,
    newFilter: PropTypes.object.isRequired,
};

export default connect(state => ({
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
    currentFilter: state.offers.currentFilter,
    newFilter: state.offers.newFilter,
}))(withRouter(OffersPaginatedGrid));
