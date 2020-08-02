import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {USERS} from "../../common/paths";
import {useTranslation} from "react-i18next";
import {UserStatus} from "../../common/app-constants";

import ReportingComponent from "../offer/ReportingComponent";

function UserBannerComponent(props) {
  const {id, username, status, withLink} = props;

  const {t} = useTranslation();

  const activeUserContent = <>
    <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
    {username}
  </>;

  const blockedUserContent = <>
    <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
    {t('user.accountIsBlocked')}
  </>;

  const deletedUserContent = <>
    <Avatar>{'?'}</Avatar>
    {t('user.accountIsDeleted')}
  </>;

  const content = status === UserStatus.ACTIVE ? activeUserContent :
      (status === UserStatus.BLOCKED ? blockedUserContent : deletedUserContent);

  const divWithContent =
      (<><div className={'user-info-banner'}>
        {content}
      </div></>);

  return (
      withLink && status === UserStatus.ACTIVE ?
          <div className={'user-info-container'}>
            <Link to={USERS + '/' + id} className={'link-no-styles user-info-banner'}>
              {divWithContent}
            </Link>
            <ReportingComponent userId={id}/>
          </div>
          : <div className={'user-info-container'}> divWithContent </div>
  );
}

UserBannerComponent.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  status: PropTypes.string.isRequired,
  withLink: PropTypes.bool,
};

export default UserBannerComponent;