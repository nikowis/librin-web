import React from 'react';
import '../App.scss';
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function NotificationContainer(props) {

    const alertContainer = (message) => {
        return (
            <Alert variant='primary'>
                {message}
            </Alert>
        );
    };

    return (
        <div className='notification-container'>
            <div className='notification-message'>
                {props.showNotification ? alertContainer(props.notificationMessage) : null}
            </div>
        </div>
    );
}

NotificationContainer.propTypes = {
    showNotification: PropTypes.bool.isRequired,
    notificationMessage: PropTypes.string
};

export default connect(state => ({
    showNotification: state.app.showNotification,
    notificationMessage: state.app.notificationMessage
}))(NotificationContainer);