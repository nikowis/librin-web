import React, {useEffect} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Alert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import {store} from "index";
import {CLEAR_API_ERROR, CLEAR_AUTH_ERROR} from "redux/actions";

function ErrorContainer(props) {

    const [open, setOpen] = React.useState(false);

    const {authError, apiError} = props;

    useEffect(() => {
        setOpen(authError || apiError);
    }, [authError, apiError]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        if (apiError) {
            store.dispatch({type: CLEAR_API_ERROR});
        }
        if (authError) {
            store.dispatch({type: CLEAR_AUTH_ERROR});
        }
    };

    return (
        <Snackbar open={open} onClose={handleClose}>
            <Alert onClose={handleClose} elevation={6} variant="filled" severity="error">
                {props.errorMessage}
            </Alert>
        </Snackbar>
    );

}

ErrorContainer.propTypes = {
    authError: PropTypes.bool.isRequired,
    apiError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
};

export default connect(state => ({
    authError: state.app.authError,
    apiError: state.app.apiError,
    errorMessage: state.app.errorMessage
}))(ErrorContainer);