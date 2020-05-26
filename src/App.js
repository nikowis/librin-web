import React, {useEffect} from 'react';
import './App.scss';
import TopAppBar from "./components/appbar/TopAppBar";
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
            dispatch(Api.getMe());
        }
    }, [dispatch, authenticated]);

    return (
        <div className="app">
            <TopAppBar/>
            <ErrorContainer/>
            <NotificationContainer/>
            <Container maxWidth="lg" id="app-content-container">
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
    authenticated: state.me.authenticated,
    pendingRequests: state.app.pendingRequests
}))(App);
