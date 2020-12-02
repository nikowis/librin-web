import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import {USERS} from "common/paths";
import {userPropType} from "common/prop-types";

function UserInfoChipLink(props) {

  const {user} = props;

  return (
      <Link to={USERS + '/' + user.id} className={'link-no-styles'}>
        <Chip avatar={<Avatar>{user.username.substring(0, 1).toUpperCase()}</Avatar>}
              label={user.username} className={'user-info-chip'}/>
      </Link>
  );
}

UserInfoChipLink.propTypes = {
  user: userPropType
};

export default UserInfoChipLink;
