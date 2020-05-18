import React from 'react';
import {CREATE_OFFER, LOGIN, LOGOUT, MESSAGES, MY_OFFERS, OFFERS, PROFILE, REGISTER, ROOT} from "../../common/paths";
import {useTranslation} from 'react-i18next';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuList from "@material-ui/core/MenuList";
import MenuIcon from '@material-ui/icons/Menu';
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import TopMenuListItem from "./TopMenuListItem";

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
                                    <TopMenuListItem show selected={currentPathname === OFFERS || currentPathname === ROOT}
                                                    key={'offers'} icon={<HomeIcon/>} text={t('offers.page')} onClick={(e) => redirect(e, OFFERS)}
                                    />
                                    <TopMenuListItem show={!props.authenticated} selected={currentPathname === LOGIN}
                                                     key={'login'} icon={<VpnKeyIcon/>} text={t('login.page')} onClick={(e) => redirect(e, LOGIN)}
                                    />
                                    <TopMenuListItem show={!props.authenticated} selected={currentPathname === REGISTER}
                                                     key={'register'} icon={<VpnKeyIcon/>} text={t('register.page')} onClick={(e) => redirect(e, REGISTER)}
                                    />
                                    <TopMenuListItem show={props.authenticated} selected={currentPathname === MESSAGES || currentPathname.replace(urlIdSuffixRegex, "") === MESSAGES}
                                                     key={'messages'} icon={<VpnKeyIcon/>} text={t('messages.page')} onClick={(e) => redirect(e, MESSAGES)}
                                    />
                                    <TopMenuListItem show={props.authenticated} selected={currentPathname === CREATE_OFFER} onClick={(e) => redirect(e, CREATE_OFFER)}
                                                     key={'create'} icon={<AddIcon/>} text={t('offers.create.page')}
                                    />
                                    <TopMenuListItem show={props.authenticated} selected={currentPathname === MY_OFFERS} onClick={(e) => redirect(e, MY_OFFERS)}
                                                     key={'myoffers'} icon={<PlaylistAddIcon/>} text={t('myoffers.page')}
                                    />
                                    <TopMenuListItem show={props.authenticated} selected={currentPathname === PROFILE} onClick={(e) => redirect(e, PROFILE)}
                                                     key={'profile'} icon={<PersonIcon/>} text={t('profile.page')}
                                    />
                                    <TopMenuListItem show={props.authenticated} selected={currentPathname === LOGOUT} onClick={(e) => redirect(e, LOGOUT)}
                                                     key={'logout'} icon={<ExitToAppIcon/>} text={t('logout')}
                                    />
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
