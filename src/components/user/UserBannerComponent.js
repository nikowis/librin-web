import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {RATINGS, USERS} from "../../common/paths";
import {useTranslation} from "react-i18next";
import {UserStatus} from "../../common/app-constants";

import ReportingComponent from "../offer/ReportingComponent";
import Rating from "@material-ui/lab/Rating/Rating";
import {userPropType} from "common/prop-types";

function UserBannerComponent(props) {
  const {user, withLink} = props;
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

  const ratingContent = (
      <div className={'user-info-rating centeredContainer'}>
        <Rating
            readOnly
            size="small"
            precision={0.1}
            value={avgRating}
        />
        {avgRating ?
            <div className={'user-rating-label'}>
              <span className={'user-rating-average'}>{avgRating.toFixed(1)}/5</span>
              <span className={'user-rating-count'}> ({ratingCount})</span>
            </div>
            : null
        }
      </div>
  );

  const divWithContent =
      (<>
        <div className={'user-info-banner'}>
          {content}
          {withLink ? ratingContent :
              <Link to={USERS + '/' + id + RATINGS} className={'link-no-styles'}>
                {ratingContent}
              </Link>
          }
        </div>
      </>);

  return (
      withLink && status === UserStatus.ACTIVE ?
          <div className={'user-info-container'}>
            <Link to={USERS + '/' + id} className={'link-no-styles user-info-banner'}>
              {divWithContent}
            </Link>
            <ReportingComponent userId={id}/>
          </div>
          : <div className={'user-info-container'}> {divWithContent} </div>
  );
}

UserBannerComponent.propTypes = {
  user: userPropType,
  withLink: PropTypes.bool,
};

export default UserBannerComponent;