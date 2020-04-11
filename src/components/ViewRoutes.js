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
import {HOME, LOGIN, LOGOUT, PROFILE, REGISTER, ROOT} from "../common/paths";

function ViewRoutes() {
    return (
        <Switch>
            <Route path={ROOT} exact={true}>
                <Home/>
            </Route>
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
            <Route component={NoMatchingView}/>

        </Switch>
    );
}


ViewRoutes.propTypes = {};

export default ViewRoutes;