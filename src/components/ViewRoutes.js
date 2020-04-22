import React from 'react';
import './../App.scss';
import Login from "./LoginView";
import {Route, Switch} from "react-router-dom";
import OffersTableView from "./offer/OffersTableView";
import Logout from "./Logout";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Register from "./user/RegisterView";
import Profile from "./user/ProfileView";
import NoMatchingView from "./NoMatchingView";
import {
    OFFERS,
    LOGIN,
    LOGOUT,
    MY_OFFERS,
    CREATE_OFFER,
    PROFILE,
    REGISTER,
    ROOT,
    EDIT_OFFER,
    VIEW_OFFER
} from "../common/paths";
import MyOffersTableView from "./offer/MyOffersTableView";
import CreateOfferView from "./offer/CreateOfferView";
import EditOfferView from "./offer/EditOfferView";
import OfferView from "./offer/OfferView";

function ViewRoutes() {
    return (
        <Switch>
            <Route path={LOGIN}>
                <Login/>
            </Route>
            <Route path={REGISTER}>
                <Register/>
            </Route>
            <AuthenticatedRoute path={LOGOUT}>
                <Logout/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={PROFILE}>
                <Profile/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={CREATE_OFFER}>
                <CreateOfferView/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={EDIT_OFFER}>
                <EditOfferView/>
            </AuthenticatedRoute>
            <AuthenticatedRoute path={MY_OFFERS}>
                <MyOffersTableView/>
            </AuthenticatedRoute>
            <Route path={VIEW_OFFER}>
                <OfferView/>
            </Route>
            <Route path={OFFERS}>
                <OffersTableView/>
            </Route>
            <Route path={ROOT}>
                <OffersTableView/>
            </Route>
            <Route component={NoMatchingView}/>
        </Switch>
    );
}


ViewRoutes.propTypes = {};

export default ViewRoutes;