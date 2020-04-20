import React from 'react';
import './../App.scss';
import Login from "./LoginView";
import {Route, Switch} from "react-router-dom";
import Home from "./HomeView";
import Logout from "./Logout";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Register from "./user/RegisterView";
import Profile from "./user/ProfileView";
import NoMatchingView from "./NoMatchingView";
import {HOME, LOGIN, LOGOUT, MY_OFFERS, CREATE_OFFER, PROFILE, REGISTER, ROOT, EDIT_OFFER} from "../common/paths";
import MyOffersListView from "./offer/MyOffersListView";
import CreateOfferView from "./offer/CreateOfferView";
import EditOfferView from "./offer/EditOfferView";

function ViewRoutes() {
    return (
        <Switch>

            <Route path={HOME}>
                <Home/>
            </Route>
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
                <MyOffersListView/>
            </AuthenticatedRoute>
            <Route path={ROOT}>
                <Home/>
            </Route>
            <Route component={NoMatchingView}/>
        </Switch>
    );
}


ViewRoutes.propTypes = {};

export default ViewRoutes;