import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {HOME, LOGIN, LOGOUT, MY_OFFERS, CREATE_OFFER, PROFILE, REGISTER, ROOT} from "../common/paths";
import {useTranslation} from 'react-i18next';
import MenuIcon from '@material-ui/icons/Menu';

import {CHANGE_LANG} from '../redux/actions'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
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

function TopMenu(props) {

    const {t, i18n} = useTranslation();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const changeLang = (lang) => {
        const {dispatch} = props;
        i18n.changeLanguage(lang);
        dispatch({type: CHANGE_LANG, payload: lang});
    };

    const languageButton =
        <>
            {props.lang !== 'pl' ? <Button onClick={() => changeLang('pl')}>PL</Button> : null}
            {props.lang !== 'en' ? <Button onClick={() => changeLang('en')}>EN</Button> : null}
        </>;

    const redirect = (to) => {
        handleDrawerClose();
        props.history.push(to);
    };

    const currentPathname = props.history.location.pathname;
    console.log(currentPathname);
    function authenticatedMenu() {
        return (<List>
            <ListItem selected={currentPathname === HOME || currentPathname === ROOT} button key={'home'} onClick={() => redirect(HOME)}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={t('home.page')}/>
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
            <ListItem selected={currentPathname === HOME || currentPathname === ROOT} button key={'home'} onClick={() => redirect(HOME)}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText primary={t('home.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === REGISTER} button key={'register'} onClick={() => redirect(REGISTER)}>
                <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                <ListItemText primary={t('register.page')}/>
            </ListItem>
            <ListItem selected={currentPathname === LOGIN} button key={'login'} onClick={() => redirect(LOGIN)}>
                <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                <ListItemText primary={t('login.page')}/>
            </ListItem>
        </List>);
    }

    return (
        <div className="top-menu">
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleDrawerOpen} edge="start" className='top-menu-button' color="inherit"
                                aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className='top-menu-title'>
                        Książkofilia
                    </Typography>
                    {languageButton}
                </Toolbar>
            </AppBar>
            <Drawer
                className="top-menu-drawer"
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className="top-menu-drawer-header">
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
    login: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
    authError: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired
};

export default connect(state => ({
    login: state.user.login,
    authenticated: state.user.authenticated,
    authError: state.app.authError,
    lang: state.user.lang
}))(withRouter(TopMenu));
