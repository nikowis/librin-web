import React from 'react';
import {CREATE_OFFER, LOGIN, LOGOUT, CONVERSATIONS, MY_OFFERS, OFFERS, SETTINGS, REGISTER, ROOT} from "../../common/paths";
import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TopMenuListItem from "./TopMenuListItem";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';

function TopMenuListItems(props) {

    const {t} = useTranslation();

    const redirect = (ev, to) => {
        props.handleClose(ev);
        props.history.push(to);
    };

    const currentPathname = props.history.location.pathname;
    const urlIdSuffixRegex = /\/\d+/g;

    return (
        <>
            <TopMenuListItem show selected={currentPathname === OFFERS || currentPathname === ROOT}
                             mykey={'offers'} icon={<HomeIcon/>} text={t('offer.offersPage')}
                             onClick={(e) => redirect(e, OFFERS)}/>
            <TopMenuListItem show={!props.authenticated} selected={currentPathname === LOGIN}
                             mykey={'login'} icon={<AccountCircle/>} text={t('login.page')}
                             onClick={(e) => redirect(e, LOGIN)}/>
            <TopMenuListItem show={!props.authenticated} selected={currentPathname === REGISTER}
                             mykey={'register'} icon={<VpnKeyIcon/>} text={t('register.page')}
                             onClick={(e) => redirect(e, REGISTER)}/>
            <TopMenuListItem show={props.authenticated}
                             selected={currentPathname === CONVERSATIONS || currentPathname.replace(urlIdSuffixRegex, "") === CONVERSATIONS}
                             mykey={'conversations'} icon={<MailIcon/>} text={t('conversations.page')}
                             onClick={(e) => redirect(e, CONVERSATIONS)}/>
            <TopMenuListItem show={props.authenticated} selected={currentPathname === CREATE_OFFER}
                             onClick={(e) => redirect(e, CREATE_OFFER)}
                             mykey={'create'} icon={<AddIcon/>} text={t('offer.createPage')}/>
            <TopMenuListItem show={props.authenticated} selected={currentPathname === MY_OFFERS}
                             onClick={(e) => redirect(e, MY_OFFERS)}
                             mykey={'myoffers'} icon={<PersonIcon/>} text={t('offer.myoffersPage')}/>
            <TopMenuListItem show={props.authenticated} selected={currentPathname === SETTINGS}
                             onClick={(e) => redirect(e, SETTINGS)}
                             mykey={'settings'} icon={<SettingsIcon/>} text={t('settings.page')}/>
            <TopMenuListItem show={props.authenticated} selected={currentPathname === LOGOUT}
                             onClick={(e) => redirect(e, LOGOUT)}
                             mykey={'logout'} icon={<ExitToAppIcon/>} text={t('logout')}/>

        </>
    );

}

TopMenuListItems.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default withRouter(TopMenuListItems);
