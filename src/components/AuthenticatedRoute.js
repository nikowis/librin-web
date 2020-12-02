import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {LOGIN} from "common/paths";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function AuthenticatedRoute({children, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                authenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: LOGIN,
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

AuthenticatedRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default connect(state => ({
    authenticated: state.me.authenticated,
}))(AuthenticatedRoute);
