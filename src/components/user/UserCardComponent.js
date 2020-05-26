import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Avatar from "@material-ui/core/Avatar";

function UserCardComponent(props) {
    const {username} = props;
    return (
        <Card className={'user-info-card'}>
            <Avatar>{username.substring(0, 1).toUpperCase()}</Avatar>
            {username}
        </Card>
    );
}

UserCardComponent.propTypes = {};

export default UserCardComponent;