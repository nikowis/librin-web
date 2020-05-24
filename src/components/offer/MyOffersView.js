import React, {useEffect} from 'react';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import LoaderComponent from "../LoaderComponent";
import PropTypes from "prop-types";
import {FETCH_MY_OFFERS} from "../../redux/actions";
import {withRouter} from 'react-router-dom';
import {MY_OFFERS} from "../../common/paths";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import PaginationComponent from "../PaginationComponent";
import OfferCard from "./OfferCard";

function MyOffersView(props) {

    const {t} = useTranslation();
    const {dispatch, offers, location, history, currentPage, totalPages, userId} = props;
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
            dispatch(Api.getMyOffers(pageQuery - 1, userId, FETCH_MY_OFFERS));
        }
    }, [dispatch, offers, currentPage, pageQuery, userId]);

    const offerRows = () => {
        return offers.map((offer) => {
            return (
                <Grid item xs={6} sm={4} md={3} key={offer.id} className={"offer-grid-item"}>
                    <OfferCard offer={offer} myOffer={true} link={process.env.PUBLIC_URL + MY_OFFERS + '/' + offer.id}/>
                </Grid>
            );
        });
    };

    const getView = () => {
        return <>
            {pageQuery <= totalPages ?
                <>
                    <Grid container>
                        {offerRows()}
                    </Grid>
                    <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
                </>
                : t('noElementsFound')}
        </>;
    };

    return (
        <>
            {offers === null ? <LoaderComponent/> : getView()}
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
    userId: state.user.id,
    offers: state.myoffers.content,
    currentPage: state.myoffers.currentPage,
    totalPages: state.myoffers.totalPages,
}))(withRouter(MyOffersView));
