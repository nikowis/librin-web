import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {CREATE_OFFER, LOGIN, LOGOUT, MESSAGES, MY_OFFERS, OFFERS, PROFILE, REGISTER, ROOT} from "../common/paths";
import {useTranslation} from 'react-i18next';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import List from "@material-ui/core/List";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function TopMenu(props) {

    const {t} = useTranslation();

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const redirect = (to) => {
        // handleDrawerClose();
        props.history.push(to);
    };

    const currentPathname = props.history.location.pathname;

    function authenticatedMenu() {
        let urlIdSuffixRegex = /\/\d+/g;
        return (<List>
            <ListItem selected={currentPathname === OFFERS || currentPathname === ROOT} button key={'offers'} onClick={() => redirect(OFFERS)}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={t('offers.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === MESSAGES || currentPathname.replace(urlIdSuffixRegex, "") === MESSAGES} button key={'messages'} onClick={() => redirect(MESSAGES)}>
                <ListItemIcon><MailOutlineIcon/></ListItemIcon>
                <ListItemText primary={t('messages.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === CREATE_OFFER} button key={'create'} onClick={() => redirect(CREATE_OFFER)}>
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary={t('offers.create.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === MY_OFFERS} button key={'myoffers'} onClick={() => redirect(MY_OFFERS)}>
                <ListItemIcon><PlaylistAddIcon/></ListItemIcon>
                <ListItemText primary={t('myoffers.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === PROFILE} button key={'profile'} onClick={() => redirect(PROFILE)}>
                <ListItemIcon><PersonIcon/></ListItemIcon>
                <ListItemText primary={t('profile.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === LOGOUT} button key={'logout'} onClick={() => redirect(LOGOUT)}>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText primary={t('logout')}/>
            </ListItem>
        </List>);
    }

    function unauthenticatedMenu() {
        return (<List>
            <ListItem selected={currentPathname === OFFERS || currentPathname === ROOT} button key={'offers'} onClick={() => redirect(OFFERS)}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={t('offers.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === LOGIN} button key={'login'} onClick={() => redirect(LOGIN)}>
                <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                <ListItemText primary={t('login.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === REGISTER} button key={'register'} onClick={() => redirect(REGISTER)}>
                <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                <ListItemText primary={t('register.page')}/>
            </ListItem>
        </List>);
    }

    return (
        <div className="top-menu">
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleDrawerOpen} edge="start" color="inherit"
                                aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className='top-menu-title'>
                        Książkofilia
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {props.authenticated ? authenticatedMenu() : unauthenticatedMenu()}
                </List>
            </Drawer>
        </div>
    );


}

TopMenu.propTypes = {
    email: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
    authError: PropTypes.bool.isRequired,
};

export default connect(state => ({
    email: state.user.email,
    authenticated: state.user.authenticated,
    authError: state.app.authError
}))(withRouter(TopMenu));
