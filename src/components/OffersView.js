import React, {useEffect} from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../common/api-communication";
import LoaderView from "./LoaderView";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import OffersTable from "./offer/OffersTable";
import {EDIT_OFFER} from "../redux/actions";
import {OFFERS} from "../common/paths";

function OffersView(props) {

    const {t} = useTranslation();
    const {dispatch, offers, location, history, currentPage, totalPages} = props;
    const {search, pathname} = location;
    const {replace} = history;

    const pageQuery = Api.getPageParam(search);

    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            replace({
                pathname: pathname,
                search: "?" + new URLSearchParams({page: 1}).toString()
            })
        }
    }, [replace, pathname, pageQuery]);

    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            return;
        }
        if (offers === null || (pageQuery !== currentPage)) {
            dispatch(Api.getOffers(pageQuery - 1));
        }
    }, [dispatch, offers, currentPage, pageQuery]);

    const handleView = (offer) => {
        dispatch({type: EDIT_OFFER, payload: offer});
        props.history.push(OFFERS + '/' + offer.id);
    };

    const getView = () => {
        return <>
            {pageQuery <= totalPages ? <OffersTable offers={offers} handleView={handleView} currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/> : t('noElementsFound')}
        </>;
    };

    return (
        <>
            {offers === null ? <LoaderView/> : getView()}
        </>
    );

}

OffersView.propTypes = {
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
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
}))(withRouter(OffersView));
