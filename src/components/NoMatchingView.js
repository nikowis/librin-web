import React from 'react';
import {Redirect} from "react-router-dom";
import {ROOT} from "common/paths";

function NoMatchingView() {
    return (
        <Redirect to={ROOT} push={false}/>
    )
}

NoMatchingView.propTypes = {};

export default NoMatchingView;