import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

function OfferCard(props) {

    const {t} = useTranslation();
    const {offer, onView, onSendMessage} = props;

    return (
        <Card className={'offer-card'}>
            <CardHeader
                title={offer.title}
                subheader={<>
                    <div>{offer.author}</div>
                    <div>{offer.price + ' ' + t('currencySymbol')}</div>
                </>}
            />
            <div className={'offer-card-image'}>
                    <img src={offer.attachment ? offer.attachment.url : process.env.PUBLIC_URL + '/Placeholder.png'}
                         alt={"Offer"}/>

            </div>
            <CardActions>

            </CardActions>
        </Card>
    );
}

OfferCard.propTypes = {
    offer:
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
    onView: PropTypes.func.isRequired,
    onSendMessage: PropTypes.func,
};

export default OfferCard;
