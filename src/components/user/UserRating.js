import React from 'react';
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating/Rating";
import {Link} from "react-router-dom";
import {RATINGS, USERS} from "common/paths";

function UserRating(props) {
  const {userId, avgRating, ratingCount} = props;

  const userRating = <div className={'user-info-rating centered-container'}>
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
  </div>;

  return (
      <>
        {ratingCount > 0 ?
            <Link to={USERS + '/' + userId + RATINGS} className={'link-no-styles'}>
              {userRating}
            </Link> : null
        }
      </>
  );
}

UserRating.propTypes = {
  avgRating: PropTypes.number,
  ratingCount: PropTypes.number,
};

export default UserRating;