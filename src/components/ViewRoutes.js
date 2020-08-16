import React from 'react';
import Login from "./user/LoginView";
import {Route, Switch} from "react-router-dom";
import Logout from "./Logout";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Register from "./user/RegisterView";
import Profile from "./user/ProfileView";
import NoMatchingView from "./NoMatchingView";
import {
  CHANGE_PASSWORD,
  CONFIRM_EMAIL,
  CREATE_OFFER,
  EDIT_OFFER,
  GENERATE_PASSWORD_RESET,
  LOGIN,
  LOGOUT,
  MESSAGES,
  MESSAGES_CONVERSATION,
  MY_OFFERS,
  OFFER_VIEW,
  OFFERS,
  PROFILE,
  PROFILE_CHANGE_PASSWORD,
  REGISTER,
  ROOT,
  USER_VIEW
} from "../common/paths";
import MyOffersTableView from "./offer/MyOffersView";
import CreateOfferView from "./offer/CreateOfferView";
import EditOfferView from "./offer/EditOfferView";
import OfferView from "./offer/OfferView";
import ConversationView from "./messages/ConversationView";
import OffersView from "./offer/OffersView";
import ConfirmEmailView from "./user/ConfirmEmailView";
import GeneratePasswordResetView from "./user/GeneratePasswordResetView";
import ChangePasswordView from "./user/ChangePasswordWithTokenView";
import ChangProfilePasswordView from "./user/ChangProfilePasswordView";
import UserView from "./user/UserView";
import ConversationsView from "./messages/ConversationsView";
import Helmet from "react-helmet";
import {useTranslation} from "react-i18next";

function ViewRoutes() {
  const {t} = useTranslation();

  return (
      <Switch>
        <Route path={LOGIN}>
          <Helmet>
            <title>{t('login.submit') + ' - ' + t('brand')}</title>
          </Helmet>
          <Login/>
        </Route>
        <Route path={REGISTER}>
          <Helmet>
            <title>{t('register.submit') + ' - ' + t('brand')}</title>
          </Helmet>
          <Register/>
        </Route>
        <AuthenticatedRoute path={LOGOUT}>
          <Logout/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={PROFILE_CHANGE_PASSWORD}>
          <Helmet>
            <title>{t('user.password.change') + ' - ' + t('brand')}</title>
          </Helmet>
          <ChangProfilePasswordView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={PROFILE}>
          <Helmet>
            <title>{t('profile.title') + ' - ' + t('brand')}</title>
          </Helmet>
          <Profile/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={CREATE_OFFER}>
          <Helmet>
            <title>{t('offer.createPage') + ' - ' + t('brand')}</title>
          </Helmet>
          <CreateOfferView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={EDIT_OFFER}>
          <Helmet>
            <title>{t('offer.editPage') + ' - ' + t('brand')}</title>
          </Helmet>
          <EditOfferView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={MY_OFFERS}>
          <Helmet>
            <title>{t('offer.myoffersPage') + ' - ' + t('brand')}</title>
          </Helmet>
          <MyOffersTableView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={MESSAGES_CONVERSATION}>
          <Helmet>
            <title>{t('messages.page') + ' - ' + t('brand')}</title>
          </Helmet>
          <ConversationView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={MESSAGES}>
          <Helmet>
            <title>{t('messages.page') + ' - ' + t('brand')}</title>
          </Helmet>
          <ConversationsView/>
        </AuthenticatedRoute>
        <Route path={USER_VIEW}>
          <UserView/>
        </Route>
        <Route path={OFFER_VIEW}>
          <OfferView/>
        </Route>
        <Route path={OFFERS}>
          <OffersView/>
        </Route>
        <Route path={CHANGE_PASSWORD}>
          <ChangePasswordView/>
        </Route>
        <Route path={GENERATE_PASSWORD_RESET}>
          <Helmet>
            <title>{t('user.password.generatePasswordTokenLink') + ' - ' + t('brand')}</title>
          </Helmet>
          <GeneratePasswordResetView/>
        </Route>
        <Route path={CONFIRM_EMAIL}>
          <ConfirmEmailView/>
        </Route>
        <Route path={ROOT}>
          <Helmet>
            <meta name="robots" content="index, nofollow"/>
          </Helmet>
          <OffersView/>
        </Route>
        <Route component={NoMatchingView}/>
      </Switch>
  );
}


ViewRoutes.propTypes = {};

export default ViewRoutes;