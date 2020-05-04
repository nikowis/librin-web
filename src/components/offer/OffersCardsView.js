import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";
import LoaderView from "./../LoaderView";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {EDIT_OFFER} from "../../redux/actions";
import {MESSAGES, OFFERS} from "../../common/paths";
import Card from "@material-ui/core/Card";
import PaginationComponent from "../PaginationComponent";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";

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

    const handleViewOffer = (offer) => {
        dispatch({type: EDIT_OFFER, payload: offer});
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
                <Grid item sm={12} md={6} lg={4} key={offer.id} onClick={() => handleViewOffer(offer)}>
                    <Card className={'offerCard'} elevation={3} style={{maxWidth: 360, margin: "auto"}}>
                        <CardActionArea>
                            <CardHeader
                                title={offer.title}
                                subheader={<>
                                    <div>{offer.author}</div>
                                    <div>{offer.price + ' ' + t('currencySymbol')}</div>
                                </>}
                            />
                            <CardMedia
                                style={{
                                    paddingTop: '100%'
                                }}
                                image={offer.attachment ? offer.attachment.url : process.env.PUBLIC_URL + '/Placeholder.png'}
                            />
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => handleViewOffer(offer)}>
                                {t('offers.view.page')}
                            </Button>
                            <Button size="small" color="primary" onClick={() => handleSendMessage(offer)}>
                                {t('offers.view.message')}
                            </Button>
                        </CardActions>
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
            <Grid container spacing={3} alignItems="center" justify="center">
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
