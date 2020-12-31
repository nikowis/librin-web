import React from 'react';
import {UserStatus} from "common/app-constants";

import ReportingComponent from "components/offer/ReportingComponent";
import {userPropType} from "common/prop-types";
import UserBanner from "components/user/UserBanner";
import PropTypes from "prop-types";
import UserPreferencesDetails from "components/user/UserPreferencesDetails";

function UserCardComponent(props) {
  const {user, withLink} = props;
  const {id, status, exchange, shipment, selfPickup, selfPickupCity} = user;

  return (
      status === UserStatus.ACTIVE ?
          <div className={'user-info-card'}>
            <UserBanner user={user} withLink={withLink}/>
            <ReportingComponent userId={id}/>
            <UserPreferencesDetails exchange={exchange} shipment={shipment} selfPickup={selfPickup}
                                    selfPickupCity={selfPickupCity}/>
          </div>
          : <UserBanner user={user} withLink={withLink}/>
  );
}

UserCardComponent.propTypes = {
  user: userPropType,
  withLink: PropTypes.bool
};

export default UserCardComponent;