import React from 'react';

import loadable from '@loadable/component'
import OfferView from "components/offer/OfferView";
import OffersView from "components/offer/OffersView";
import UserView from "components/user/UserView";
import {Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "components/AuthenticatedRoute";

import {
  CHANGE_PASSWORD,
  CONFIRM_EMAIL,
  CONVERSATION,
  CONVERSATIONS,
  CREATE_OFFER,
  EDIT_OFFER,
  GENERATE_CONFIRM_EMAIL,
  GENERATE_PASSWORD_RESET,
  LOGIN,
  LOGOUT,
  MY_OFFERS,
  OFFER_VIEW,
  OFFERS,
  PROFILE_CHANGE_PASSWORD,
  RATINGS_VIEW,
  REGISTER,
  ROOT,
  SETTINGS,
  USER_VIEW
} from "common/paths";
import Helmet from "react-helmet";
import {useTranslation} from "react-i18next";

const Login = loadable(() => import('components/user/LoginView'));
const Logout = loadable(() => import('components/Logout'));
const Register = loadable(() => import('components/user/RegisterView'));
const Settings = loadable(() => import('components/user/settings/SettingsView'));
const RatingsView = loadable(() => import('components/user/RatingsView'));
const MyOffersTableView = loadable(() => import('components/offer/MyOffersView'));
const CreateOfferView = loadable(() => import('components/offer/CreateOfferView'));
const EditOfferView = loadable(() => import('components/offer/EditOfferView'));
const NoMatchingView = loadable(() => import('components/NoMatchingView'));
const ConversationView = loadable(() => import('components/messages/ConversationView'));
const ConfirmEmailView = loadable(() => import('components/user/ConfirmEmailView'));
const GenerateConfirmEmailView = loadable(() => import('components/user/GenerateConfirmEmailView'));
const GeneratePasswordResetView = loadable(() => import('components/user/GeneratePasswordResetView'));
const ChangePasswordView = loadable(() => import('components/user/ChangePasswordWithTokenView'));
const ChangProfilePasswordView = loadable(() => import('components/user/ChangProfilePasswordView'));
const ConversationsView = loadable(() => import('components/messages/ConversationsView'));


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
        <AuthenticatedRoute path={SETTINGS}>
          <Helmet>
            <title>{t('settings.title') + ' - ' + t('brand')}</title>
          </Helmet>
          <Settings/>
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
            <title>{t('user.myProfile') + ' - ' + t('brand')}</title>
          </Helmet>
          <MyOffersTableView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={CONVERSATION}>
          <Helmet>
            <title>{t('messages.page') + ' - ' + t('brand')}</title>
          </Helmet>
          <ConversationView/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path={CONVERSATIONS}>
          <Helmet>
            <title>{t('messages.page') + ' - ' + t('brand')}</title>
          </Helmet>
          <ConversationsView/>
        </AuthenticatedRoute>
        <Route path={RATINGS_VIEW}>
          <RatingsView/>
        </Route>
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
        <Route path={GENERATE_CONFIRM_EMAIL}>
          <GenerateConfirmEmailView/>
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