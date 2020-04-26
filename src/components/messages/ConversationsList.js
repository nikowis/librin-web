import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoaderView from "../LoaderView";
import {TextField} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button";
import {EDIT_OFFER, HIDE_NOTIFICATION, OFFER_UPDATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {store} from "../../index";
import {NOTIFICATION_DURATION, OfferStatus} from "../../common/app-constants";
import {MESSAGES, MY_OFFERS, OFFERS} from "../../common/paths";
import Grid from "@material-ui/core/Grid";
import ConversationComponent from "./ConversationComponent";

function ConversationsList(props) {

    const {t} = useTranslation();
    const {dispatch} = props;
    let {id} = useParams();
    const propId = props.id;

    const {history} = props;

    const getView = () => {
        return (
            <>
                </>
        );
    };

    return (
        <Card>
            CONVERSATIONNZ LIIIZT
            {/*{!title || id.toString() !== id ? <LoaderView/> : getView()}*/}
        </Card>
    );
}

ConversationsList.propTypes = {

};

export default connect(state => ({

}))(withRouter(ConversationsList));