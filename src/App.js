import React, {useEffect} from 'react';
import './App.scss';
import TopMenu from "./components/TopMenu";
import {connect} from "react-redux";
import ViewTitle from "./components/ViewTitle";
import Api from "./common/api-communication";
import ViewRoutes from "./components/ViewRoutes";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Spinner} from "react-bootstrap";
import ErrorContainer from "./components/ErrorContainer";
import NotificationContainer from "./components/NotificationContainer";

function App(props) {

    const {dispatch, authenticated} = props;
    const {i18n} = useTranslation();
    const {lang} = props;

    useEffect(() => {
        if (authenticated) {
            dispatch(Api.getUser());
        }
    }, [dispatch, authenticated]);

    useEffect(() => {
        window.lang = lang;
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    return (
        <div className="app">
            <header className="app-header">
            </header>
            <TopMenu/>
            <ErrorContainer/>
            <NotificationContainer/>
            <ViewTitle/>
            <div className="app-card">
                <div className="app-content">
                    <ViewRoutes/>
                </div>
            </div>
            {props.pendingRequests > 0 ? <Spinner className="pending-requests-spinner" animation="border"/> : null}
        </div>
    );

}

App.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    pendingRequests: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
    pendingRequests: state.app.pendingRequests,
    lang: state.user.lang
}))(App);
