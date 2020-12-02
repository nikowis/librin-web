import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ROOT} from "common/paths";
import PropTypes from "prop-types";
import {LOGOUT_ACTION} from "redux/actions";

function Logout(props) {

    const logout = () => {
        const {dispatch} = props;
        dispatch({type: LOGOUT_ACTION});
    };

    if (props.authenticated) {
        logout();
    }

    return <Redirect to={ROOT} push={true}/>;

}

Logout.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.me.authenticated
}))(Logout);
