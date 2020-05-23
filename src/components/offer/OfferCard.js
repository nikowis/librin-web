import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import {OFFERS} from "../../common/paths";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

function OfferCard(props) {

    const {t} = useTranslation();
    const {offer} = props;
    const {owner} = offer;

    return (
        <Card className={'offer-card'}>
            <CardHeader
                title={
                    <div className={'limit-text-lines two-line'}>
                        {offer.title}
                    </div>
                }
                subheader={<>
                    <div className={'limit-text-lines'}>{offer.author}</div>
                    <div className={'limit-text-lines'}>{offer.price + ' ' + t('currencySymbol')}</div>
                    <Chip avatar={<Avatar>{owner.username.substring(0, 1).toUpperCase()}</Avatar>}
                          label={owner.username} className={'user-info'}/>

                </>}
            />
            <a href={process.env.PUBLIC_URL + OFFERS + '/' + offer.id} className={'offer-card-image'}>
                <img src={offer.attachment ? offer.attachment.url : process.env.PUBLIC_URL + '/Placeholder.png'}
                     alt={"Offer"}/>
            </a>
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
            owner: PropTypes.shape({
                id: PropTypes.number.isRequired,
                username: PropTypes.string.isRequired,
            })
        }),
};

export default OfferCard;
