import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {useTranslation} from "react-i18next";
import {UserStatus} from "common/app-constants";
import PropTypes from "prop-types";
import {USERS} from "common/paths";
import {Link} from "react-router-dom";
import {userPropType} from "common/prop-types";

function UserBanner(props) {
  const {user, withUserLink} = props;
  const {id, username, status, avgRating, ratingCount} = user;

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

  return (
      <div className={'user-info-banner'}>
        <Link to={USERS + '/' + id} className={'link-no-styles'}>
         {content}
        </Link>
      </div>
  );
}

UserBanner.propTypes = {
  user: userPropType,
};

export default UserBanner;