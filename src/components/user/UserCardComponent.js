import React from 'react';
import Avatar from "@material-ui/core/Avatar";

function UserCardComponent(props) {
    const {username} = props;
    return (
        <div className={'user-info-banner'}>
            <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
            {username}
        </div>
    );
}

UserCardComponent.propTypes = {};

export default UserCardComponent;