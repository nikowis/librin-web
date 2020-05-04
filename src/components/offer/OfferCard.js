import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";

function OfferCard(props) {

    const {t} = useTranslation();
    const {offer, onView, onSendMessage} = props;

    return (
        <Card className={'offerCard'} elevation={3} style={{maxWidth: 360, margin: "auto"}}>
            <CardActionArea onClick={() => onView(offer)}>
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
                {
                    onView ? <Button size="small" color="primary" onClick={() => onView(offer)}>
                        {t('offers.view.page')}
                    </Button> : null
                }
                {
                    onSendMessage ? <Button size="small" color="primary" onClick={() => onSendMessage(offer)}>
                        {t('offers.view.message')}
                    </Button> : null
                }
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
