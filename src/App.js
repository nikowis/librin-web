import React, {useEffect} from 'react';
import './App.scss';
import TopMenu from "./components/TopMenu";
import {connect} from "react-redux";
import Api from "./common/api-communication";
import ViewRoutes from "./components/ViewRoutes";
import PropTypes from "prop-types";
import ErrorContainer from "./components/ErrorContainer";
import NotificationContainer from "./components/NotificationContainer";
import Container from "@material-ui/core/Container";

function App(props) {

    const {dispatch, authenticated} = props;

    useEffect(() => {
        if (authenticated) {
            dispatch(Api.getUser());
        }
    }, [dispatch, authenticated]);

    return (
        <div className="app">
            <TopMenu/>
            <ErrorContainer/>
            <NotificationContainer/>
            <Container maxWidth="lg">
                <ViewRoutes/>
            </Container>
        </div>
    );

}

App.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    pendingRequests: PropTypes.number.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
    pendingRequests: state.app.pendingRequests
}))(App);
