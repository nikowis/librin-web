import React from 'react';
import '../App.scss';
import Alert from "react-bootstrap/Alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function ErrorContainer(props) {

    const alertContainer = (message) => {
        return (
            <Alert variant='danger'>
                {message}
            </Alert>
        );
    };

    return (
        <div className='error-container'>
            <div className='error-message'>
                {props.authError ? alertContainer(props.errorMessage) : null}
                {props.apiError ? alertContainer(props.errorMessage) : null}
            </div>
        </div>
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