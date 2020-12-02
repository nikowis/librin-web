import React from 'react';
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import OfferCard from "./OfferCard";
import {offerPropType} from "common/prop-types";

function OffersGrid(props) {

    const {offers, offerLinkBase, myOffers} = props;

    const offerRows = () => {
        return offers.map((offer) => {
            return (
                <Grid item xs={6} sm={4} md={3} key={offer.id} className={"offer-grid-item"}>
                    <OfferCard myOffer={myOffers} offer={offer} link={offerLinkBase + '/' + offer.id}/>
                </Grid>
            );
        });
    };

    return (
        <Grid container spacing={1} className={'offer-grid'  +(myOffers ? ' my-offers-grid' : '')}>
            {offerRows()}
        </Grid>
    );

}

OffersGrid.propTypes = {
    offers: PropTypes.arrayOf(offerPropType),
    offerLinkBase: PropTypes.string.isRequired,
    myOffers: PropTypes.bool
};

export default OffersGrid;
