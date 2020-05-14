import React from 'react';
import '../../App.scss';
import {CREATE_OFFER, LOGIN, LOGOUT, MESSAGES, MY_OFFERS, OFFERS, PROFILE, REGISTER, ROOT} from "../../common/paths";
import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import List from "@material-ui/core/List";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Menu(props) {

    const {t} = useTranslation();

    const redirect = (to) => {
        // handleDrawerClose();
        props.history.push(to);
    };

    const currentPathname = props.history.location.pathname;
    const urlIdSuffixRegex = /\/\d+/g;

    return (
        <>
            <div>
                <IconButton onClick={props.onClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            <List>
                <ListItem selected={currentPathname === OFFERS || currentPathname === ROOT} button key={'offers'}
                          onClick={() => redirect(OFFERS)}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary={t('offers.page')}/>
                </ListItem>
                {props.authenticated ? null :
                    <ListItem selected={currentPathname === LOGIN} button key={'login'} onClick={() => redirect(LOGIN)}>
                        <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                        <ListItemText primary={t('login.page')}/>
                    </ListItem>
                }
                {props.authenticated ? null :
                    <ListItem selected={currentPathname === REGISTER} button key={'register'}
                              onClick={() => redirect(REGISTER)}>
                        <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                        <ListItemText primary={t('register.page')}/>
                    </ListItem>
                }
                {props.authenticated ?
                    <ListItem
                        selected={currentPathname === MESSAGES || currentPathname.replace(urlIdSuffixRegex, "") === MESSAGES}
                        button key={'messages'} onClick={() => redirect(MESSAGES)}>
                        <ListItemIcon><MailOutlineIcon/></ListItemIcon>
                        <ListItemText primary={t('messages.page')}/>
                    </ListItem> : null
                }
                {props.authenticated ?
                    <ListItem selected={currentPathname === CREATE_OFFER} button key={'create'}
                              onClick={() => redirect(CREATE_OFFER)}>
                        <ListItemIcon><AddIcon/></ListItemIcon>
                        <ListItemText primary={t('offers.create.page')}/>
                    </ListItem> : null
                }
                {props.authenticated ?
                    <ListItem selected={currentPathname === MY_OFFERS} button key={'myoffers'}
                              onClick={() => redirect(MY_OFFERS)}>
                        <ListItemIcon><PlaylistAddIcon/></ListItemIcon>
                        <ListItemText primary={t('myoffers.page')}/>
                    </ListItem> : null
                }
                {props.authenticated ?
                    <ListItem selected={currentPathname === PROFILE} button key={'profile'}
                              onClick={() => redirect(PROFILE)}>
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText primary={t('profile.page')}/>
                    </ListItem> : null
                }
                {props.authenticated ?
                    <ListItem selected={currentPathname === LOGOUT} button key={'logout'}
                              onClick={() => redirect(LOGOUT)}>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText primary={t('logout')}/>
                    </ListItem> : null
                }
            </List>
        </>
    );


}

Menu.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default withRouter(Menu);
