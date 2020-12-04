import React from 'react';
import {Link} from "react-router-dom";
import {RATINGS, USERS} from "common/paths";
import {useTranslation} from "react-i18next";
import {UserStatus} from "common/app-constants";

import ReportingComponent from "components/offer/ReportingComponent";
import Rating from "@material-ui/lab/Rating/Rating";
import {userPropType} from "common/prop-types";
import UserBanner from "components/user/UserBanner";

function UserCardComponent(props) {
  const {user} = props;
  const {id, username, status, avgRating, ratingCount} = user;

  const {t} = useTranslation();

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

  return (
      status === UserStatus.ACTIVE ?
          <div className={'user-info-container'}>
            <UserBanner userId={id} username={username} status={status}/>
            <div>
              {withUserLink ? ratingContent :
                  <Link to={USERS + '/' + id + RATINGS} className={'link-no-styles'}>
                    {ratingContent}
                  </Link>
              }
            </div>
            <ReportingComponent userId={id}/>
          </div>
          : <UserBanner userId={id} username={username} status={status}/>
  );
}

UserCardComponent.propTypes = {
  user: userPropType,
};

export default UserCardComponent;