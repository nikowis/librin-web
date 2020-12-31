import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';

function UserPreferencesDetails(props) {
  const {exchange, shipment, selfPickup, selfPickupCity} = props;

  const {t} = useTranslation();

  return (
      <div className={'labeled-field secondary-text'}>
        <label htmlFor={'preferences'}>{t('settings.preferencesForm')}</label>

        {shipment ? <div>
          <SwapHorizIcon fontSize={'small'}/>
          <span>{t('user.exchange')}</span>
        </div> : null
        }
        {exchange ?
            <div>
              <LocalShippingIcon fontSize={'small'}/>
              <span>{t('user.shipment')}</span>
            </div> : null
        }
        {selfPickup ?
            <div>
              <TransferWithinAStationIcon fontSize={'small'}/>
              <span>
                <div>
                  {t('user.selfPickup')}
                </div>
                <div>
                  {selfPickupCity.displayName}
                </div>
              </span>
            </div> : null
        }

      </div>
  );
}

UserPreferencesDetails.propTypes = {
  exchange: PropTypes.bool,
  shipment: PropTypes.bool,
  selfPickup: PropTypes.bool,
  selfPickupCity: PropTypes.shape({
    id: PropTypes.number,
    displayName: PropTypes.string
  })
};

export default UserPreferencesDetails;