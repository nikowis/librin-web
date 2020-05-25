import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import {USERS} from "../../common/paths";

function OfferCard(props) {

    const {t} = useTranslation();
    const {offer, myOffer} = props;
    const {owner} = offer;

    const status = offer.status.toLowerCase();

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
                    {myOffer ?

                        <Chip label={t('offer.status.' + status)} className={'status-info-' + status}/>
                        :
                        <Link to={USERS + '/' + owner.id} className={'user-info'}>
                            <Chip avatar={<Avatar>{owner.username.substring(0, 1).toUpperCase()}</Avatar>}
                                  label={owner.username} className={'user-info'}/>
                        </Link>
                    }
                </>}
            />
            <Link to={props.link} className={'offer-card-image'}>
                <img src={offer.attachment ? offer.attachment.url : process.env.PUBLIC_URL + '/Placeholder.png'}
                     alt={"Offer"}/>
            </Link>
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
    link: PropTypes.string.isRequired,
    myOffer: PropTypes.bool
};

export default OfferCard;
