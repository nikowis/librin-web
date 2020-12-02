import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import EmptyPhotoPreviewComponent from "components/EmptyPhotoPreviewComponent";
import UserInfoChipLink from "components/offer/UserInfoChipLink";
import {PAPER_ELEVATION} from 'common/app-constants'
import {offerPropType} from "common/prop-types";

function OfferCard(props) {

  const {t} = useTranslation();
  const {offer, myOffer} = props;
  const {owner} = offer;

  const status = offer.status.toLowerCase();

  return (
      <Card elevation={PAPER_ELEVATION} square className={'offer-card'}>
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
                  : <UserInfoChipLink user={owner}/>
              }
            </>}
        />
        <Link to={props.link} className={'offer-card-image'}>
          {offer.photo ? <img src={offer.photo.url} alt={"Offer"}/>
              : <EmptyPhotoPreviewComponent/>}
        </Link>
      </Card>
  );
}

OfferCard.propTypes = {
  offer: offerPropType,
  link: PropTypes.string.isRequired,
  myOffer: PropTypes.bool
};

export default OfferCard;
