import React, {useEffect} from 'react';
import 'App.scss';
import TopAppBar from "components/appbar/TopAppBar";
import {connect} from "react-redux";
import Api from "common/api-communication";
import Websocket from "common/ws-communication";
import ViewRoutes from "components/ViewRoutes";
import PropTypes from "prop-types";
import ErrorContainer from "components/ErrorContainer";
import NotificationContainer from "components/NotificationContainer";
import Container from "@material-ui/core/Container";
import CookieConsent from "react-cookie-consent";
import {useTranslation} from "react-i18next";
import CookiesPolicyLink from "components/policy/CookiesPolicyLink";
import {WS_UPDATE_CONVERSATION} from "redux/actions";
import Helmet from "react-helmet";

function App(props) {

  const {dispatch, authenticated, mustReloadMessages} = props;
  const {t} = useTranslation();

  useEffect(() => {
    if (authenticated) {
      dispatch(Api.getMe());
      dispatch(Api.getAllConversations());
      Websocket.connectAndSubscribe((payload) => {
        dispatch({type: WS_UPDATE_CONVERSATION, payload: payload})
      })
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (authenticated && mustReloadMessages) {
      dispatch(Api.getAllConversations());
    }
  }, [dispatch, authenticated, mustReloadMessages]);

  return (
      <div className="app">
        <Helmet>
          <title>{t('brand') + ' - ' + t('landingBanner')}</title>
          <meta charSet="UTF-8"/>
          <meta name="keywords" content={t('headerMetaKeywords')}/>
          <meta name="description" content={t('headerMetaDescription')}/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="robots" content="noindex, nofollow"/>
        </Helmet>
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
  pendingRequests: PropTypes.number.isRequired,
  mustReloadMessages: PropTypes.bool.isRequired,
};

export default connect(state => ({
  authenticated: state.me.authenticated,
  pendingRequests: state.app.pendingRequests,
  mustReloadMessages: state.conversations.mustReload,
}))(App);
