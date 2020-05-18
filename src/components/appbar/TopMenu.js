import React from 'react';
import {CREATE_OFFER, LOGIN, LOGOUT, MESSAGES, MY_OFFERS, OFFERS, PROFILE, REGISTER, ROOT} from "../../common/paths";
import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MenuIcon from '@material-ui/icons/Menu';
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";

function TopMenu(props) {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const {t} = useTranslation();

    const redirect = (ev, to) => {
        handleClose(ev);
        props.history.push(to);
    };

    const currentPathname = props.history.location.pathname;
    const urlIdSuffixRegex = /\/\d+/g;

    return (
        <>
            <IconButton
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color={"inherit"}
            >
                <MenuIcon/>
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                className={"top-menu-list"}
                transition
            >
                {({TransitionProps}) => (
                    <Grow
                        {...TransitionProps}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem selected={currentPathname === OFFERS || currentPathname === ROOT} button
                                              key={'offers'}
                                              onClick={(e) => redirect(e, OFFERS)}>
                                        <ListItemIcon><HomeIcon/></ListItemIcon>
                                        <ListItemText primary={t('offers.page')}/>
                                    </MenuItem>
                                    {props.authenticated ? null :
                                        <MenuItem selected={currentPathname === LOGIN} button key={'login'}
                                                  onClick={(e) => redirect(e, LOGIN)}>
                                            <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                                            <ListItemText primary={t('login.page')}/>
                                        </MenuItem>
                                    }
                                    {props.authenticated ? null :
                                        <MenuItem selected={currentPathname === REGISTER} button key={'register'}
                                                  onClick={(e) => redirect(e, REGISTER)}>
                                            <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                                            <ListItemText primary={t('register.page')}/>
                                        </MenuItem>
                                    }
                                    {props.authenticated ?
                                        <MenuItem
                                            selected={currentPathname === MESSAGES || currentPathname.replace(urlIdSuffixRegex, "") === MESSAGES}
                                            button key={'messages'} onClick={(e) => redirect(e, MESSAGES)}>
                                            <ListItemIcon><MailOutlineIcon/></ListItemIcon>
                                            <ListItemText primary={t('messages.page')}/>
                                        </MenuItem> : null
                                    }
                                    {props.authenticated ?
                                        <MenuItem selected={currentPathname === CREATE_OFFER} button key={'create'}
                                                  onClick={(e) => redirect(e, CREATE_OFFER)}>
                                            <ListItemIcon><AddIcon/></ListItemIcon>
                                            <ListItemText primary={t('offers.create.page')}/>
                                        </MenuItem> : null
                                    }
                                    {props.authenticated ?
                                        <MenuItem selected={currentPathname === MY_OFFERS} button key={'myoffers'}
                                                  onClick={(e) => redirect(e, MY_OFFERS)}>
                                            <ListItemIcon><PlaylistAddIcon/></ListItemIcon>
                                            <ListItemText primary={t('myoffers.page')}/>
                                        </MenuItem> : null
                                    }
                                    {props.authenticated ?
                                        <MenuItem selected={currentPathname === PROFILE} button key={'profile'}
                                                  onClick={(e) => redirect(e, PROFILE)}>
                                            <ListItemIcon><PersonIcon/></ListItemIcon>
                                            <ListItemText primary={t('profile.page')}/>
                                        </MenuItem> : null
                                    }
                                    {props.authenticated ?
                                        <MenuItem selected={currentPathname === LOGOUT} button key={'logout'}
                                                  onClick={(e) => redirect(e, LOGOUT)}>
                                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                            <ListItemText primary={t('logout')}/>
                                        </MenuItem> : null
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );


}

TopMenu.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default withRouter(TopMenu);
