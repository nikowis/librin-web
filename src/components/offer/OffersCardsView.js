import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";
import LoaderView from "./../LoaderView";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {VIEW_OFFER} from "../../redux/actions";
import {MESSAGES, OFFERS} from "../../common/paths";
import PaginationComponent from "../PaginationComponent";
import Grid from "@material-ui/core/Grid";
import OfferCard from "./OfferCard";

function OffersCardsView(props) {

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
            dispatch(Api.getOffers(pageQuery - 1));
        }
    }, [dispatch, offers, currentPage, pageQuery]);

    const handleViewOffer = (offer) => {
        dispatch({type: VIEW_OFFER, payload: offer});
        props.history.push(OFFERS + '/' + offer.id);
    };

    const handleSendMessage = (offer) => {
        dispatch(Api.createConversation(offer.id)).then(res => {
            history.push(MESSAGES + '/' + res.value.id);
        });
    };

    const offerRows = () => {
        return offers.map((offer) => {
            return (
                <Grid item sm={12} md={6} lg={4} key={offer.id}>
                    <OfferCard offer={offer} onView={handleViewOffer} onSendMessage={userId === offer.ownerId ? null : handleSendMessage}/>
                </Grid>
            );
        });
    };

    const getView = () => {
        return <>
            {pageQuery <= totalPages ?
                <>
                    <br/>
                    <Grid container spacing={3} alignItems="center" justify="center">
                        {offerRows()}
                    </Grid>
                    <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
                </>
                : t('noElementsFound')}
        </>
    };

    return (
        <>
            {offers === null ? <LoaderView/> : getView()}
        </>
    );

}

OffersCardsView.propTypes = {
    userId: PropTypes.number,
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
};

export default connect(state => ({
    userId: state.user.id,
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
}))(withRouter(OffersCardsView));
