import React from 'react';
import PropTypes from "prop-types";
import {OfferStatus} from "../../common/app-constants";
import WarningStrip from "../WarningStrip";
import {useTranslation} from "react-i18next";

function OfferStatusInfoBanner(props) {

    const {userId, offer, otherUserId} = props;
    const isOfferOwner =  userId === offer.ownerId;
    const {t} = useTranslation();

    let result = <></>;
    if(isOfferOwner) {
        if(OfferStatus.SOLD === offer.status) {
            if(otherUserId && otherUserId === offer.buyerId) {
                result = <WarningStrip text={t('offer.status.youSoldToThisUser')} type={'success'}/>
            } else {
                result = <WarningStrip text={t('offer.status.youSold')}/>
            }
        } else if(OfferStatus.DELETED === offer.status) {
            result = <WarningStrip text={t('offer.status.youDeleted')}/>
        } else if(OfferStatus.INACTIVE === offer.status) {
            result = <WarningStrip text={t('offer.status.youInactivated')}/>
        }
    } else {
        if(offer.soldToMe) {
            result = <WarningStrip text={t('offer.status.soldToMe')} type={'success'}/>;
        } else if(OfferStatus.INACTIVE === offer.status) {
            result = <WarningStrip text={t('offer.status.inactiveWarn')}/>;
        } else if(OfferStatus.SOLD === offer.status) {
            result = <WarningStrip text={t('offer.status.soldWarn')}/>;
        } else if(OfferStatus.DELETED === offer.status) {
            result = <WarningStrip text={t('offer.status.deletedWarn')}/>
        }
    }

    return (<>{result}</>);

}

OfferStatusInfoBanner.propTypes = {
    userId: PropTypes.number.isRequired,
    otherUserId: PropTypes.number,
    offer: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        price: PropTypes.string,
        status: PropTypes.string,
        ownerId: PropTypes.number,
        soldToMe: PropTypes.bool,
        buyerId: PropTypes.number,
        owner: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
        })
    }).isRequired,
};

export default OfferStatusInfoBanner;