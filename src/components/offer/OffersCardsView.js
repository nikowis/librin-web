import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";
import LoaderView from "./../LoaderView";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {EDIT_OFFER} from "../../redux/actions";
import {OFFERS} from "../../common/paths";
import Card from "@material-ui/core/Card";
import PaginationComponent from "../PaginationComponent";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import PhotosPreviewComponent from "../PhotosPreviewComponent";
import Typography from "@material-ui/core/Typography";

function OffersCardsView(props) {

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

    const offerRows = () => {
        return offers.map((offer) => {
            return (
                <Grid item xs={12} sm={6} md={4} key={offer.id} onClick={() => handleView(offer)}>
                    <Card elevation={3}>
                        <PhotosPreviewComponent attachment={offer.attachment}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {offer.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {offer.author}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });
    };

    const getView = () => {
        return <>
            {pageQuery <= totalPages ? offerRows() : t('noElementsFound')}
        </>;
    };

    return (
        <>
            <br/>
            <Grid container spacing={3}>
                {offers === null ? <LoaderView/> : getView()}
            </Grid>
            <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
        </>
    );

}

OffersCardsView.propTypes = {
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
                name: PropTypes.number.isRequired,
                content: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            }),
        }),
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
}))(withRouter(OffersCardsView));
