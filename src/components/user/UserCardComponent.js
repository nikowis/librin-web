import React from 'react';
import {UserStatus} from "common/app-constants";

import ReportingComponent from "components/offer/ReportingComponent";
import {userPropType} from "common/prop-types";
import UserBanner from "components/user/UserBanner";
import PropTypes from "prop-types";

function UserCardComponent(props) {
  const {user, withLink} = props;
  const {id, status} = user;

  return (
      status === UserStatus.ACTIVE ?
          <div className={'user-info-card'}>
            <UserBanner user={user} withLink={withLink}/>
            <ReportingComponent userId={id}/>
          </div>
          : <UserBanner user={user} withLink={withLink}/>
  );
}

UserCardComponent.propTypes = {
  user: userPropType,
  withLink: PropTypes.bool
};

export default UserCardComponent;