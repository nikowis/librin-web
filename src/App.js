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
import CookieConsent from "react-cookie-consent";
import {useTranslation} from "react-i18next";
import CookiesPolicyLink from "./components/user/CookiesPolicyLink";

function App(props) {

    const {dispatch, authenticated} = props;
    const {t} = useTranslation();

    useEffect(() => {
        if (authenticated) {
            dispatch(Api.getMe());
            dispatch(Api.getAllConversations());
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
            <CookieConsent location="bottom"
                           buttonText={t('gpdr.cookieAcceptButtonText')}
                           cookieName="GPDRConsentCookie"
                           disableStyles
                           disableButtonStyles
                           contentClasses={'cookie-banner-text'}
                           buttonClasses={'cookie-banner-button'}
                           sameSite={'lax'}
            >
                {t('gpdr.cookieBannerText')}
                <br/>
                <CookiesPolicyLink/>
            </CookieConsent>
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
