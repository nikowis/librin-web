import React from 'react';
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import {USERS} from "../../common/paths";

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
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
    })
};

export default UserInfoChipLink;
