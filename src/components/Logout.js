import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import {ROOT} from "../common/paths";
import PropTypes from "prop-types";

function Logout(props) {

    const logout = () => {
        const {dispatch} = props;
        dispatch(Api.logout());
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
    authenticated: state.user.authenticated
}))(Logout);
