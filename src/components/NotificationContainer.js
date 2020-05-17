import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {store} from "../index";
import {HIDE_NOTIFICATION} from "../redux/actions";
import Alert from "@material-ui/lab/Alert/Alert";

function NotificationContainer(props) {

    const [open, setOpen] = React.useState(false);

    const {showNotification} = props;

    useEffect(() => {
        setOpen(showNotification);
    }, [showNotification]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        if (showNotification) {
            store.dispatch({type: HIDE_NOTIFICATION});
        }
    };


    return (
        <Snackbar open={open} onClose={handleClose}>
            <Alert onClose={handleClose} elevation={6} variant="filled" severity="success">
                {props.notificationMessage}
            </Alert>
        </Snackbar>
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