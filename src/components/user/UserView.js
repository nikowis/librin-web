import React, {useEffect} from 'react';

import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Api from "../../common/api-communication";
import {profileSchema} from "../../common/validation-schemas";
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION, UPDATE_USER} from "../../redux/actions";
import PropTypes from "prop-types";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import DeleteAccountComponent from "./DeleteAccountComponent";
import {translate} from "../../common/i18n-helper";
import {PROFILE_CHANGE_PASSWORD} from "../../common/paths";

function UserView(props) {

    const {t} = useTranslation();
    const {dispatch, email} = props;
    let {id} = useParams();
    return (
        <Card className={''}>
            User view {id}
        </Card>
    );

}

UserView.propTypes = {

};

export default connect(state => ({

}))(withRouter(UserView));
