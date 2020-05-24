import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";
import LoaderComponent from "../LoaderComponent";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {OFFERS} from "../../common/paths";
import PaginationComponent from "../PaginationComponent";
import Grid from "@material-ui/core/Grid";
import OfferCard from "./OfferCard";

function OffersView(props) {

    const {t} = useTranslation();
    const {dispatch, offers, location, history, prevSearch, currentPage, totalPages} = props;
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
        }
    }, [replace, pathname, search, pageQuery]);

    useEffect(() => {
        if (isNaN(parseInt(pageQuery))) {
            return;
        }
        if (offers === null || (search !== prevSearch)) {
            dispatch(Api.getOffers(new URLSearchParams(search)));
        }
    }, [dispatch, offers, pageQuery, prevSearch, search]);

    const offerRows = () => {
        return offers.map((offer) => {
            return (
                <Grid item xs={6} sm={4} md={3} key={offer.id} className={"offer-grid-item"}>
                    <OfferCard offer={offer} link={process.env.PUBLIC_URL + OFFERS + '/' + offer.id}/>
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
        </>
    };

    return (
        <>
            {offers === null ? <LoaderComponent/> : getView()}
        </>
    );

}

OffersView.propTypes = {
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
    prevSearch: PropTypes.string,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    userId: state.user.id,
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
    prevSearch: state.offers.search
}))(withRouter(OffersView));
