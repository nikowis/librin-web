import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import {useTranslation} from "react-i18next";
import {UserStatus} from "common/app-constants";
import {USERS} from "common/paths";
import {Link} from "react-router-dom";
import {userPropType} from "common/prop-types";
import PropTypes from "prop-types";
import UserRating from "components/user/UserRating";

function UserBanner(props) {
  const {user, withLink} = props;
  const {id, username, status, avgRating, ratingCount} = user;

  const {t} = useTranslation();

  const activeUserContent = <>
    {withLink ?
        <Link to={USERS + '/' + id} className={'link-no-styles'}>
          <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
        </Link>
        : <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
    }
    <div>
      {withLink ?
          <Link to={USERS + '/' + id} className={'link-no-styles'}>
            {username}
          </Link>
          : username
      }
      <UserRating userId={id} avgRating={avgRating} ratingCount={ratingCount}/>
    </div>
  </>;

  const blockedUserContent = <>
    <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
    <span>
      {t('user.accountIsBlocked')}
    </span>
  </>;

  const deletedUserContent = <>
    <Avatar>{'?'}</Avatar>
    <span>
      {t('user.accountIsDeleted')}
    </span>
  </>;

  const content = status === UserStatus.ACTIVE ? activeUserContent :
      (status === UserStatus.BLOCKED ? blockedUserContent : deletedUserContent);

  return (
      <div className={'user-info-banner'}>
        {content}
      </div>
  );
}

UserBanner.propTypes = {
  user: userPropType,
  withLink: PropTypes.bool
};

export default UserBanner;