import React from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import TopMenuListItems from "./TopMenuListItems";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {REGISTER} from "../../common/paths";
import {useTranslation} from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function TopDrawer(props) {

    const [open, setOpen] = React.useState(false);
    const {t} = useTranslation();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const handleClose = (event) => {
        toggleDrawer(false)(event);
    };

    const redirect = (to) => {
        setOpen(false);
        props.history.push(to);
    };

    return (
        <>
            <IconButton
                onClick={(ev) => toggleDrawer(true)(ev)}
                color={"inherit"}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer anchor={'top'} open={open} onClose={handleClose}>
                <div
                    className={'top-menu-drawer'}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {!props.authenticated ?
                        <List>
                            <ListItem>
                                <Button size={"small"} variant="outlined" onClick={() => redirect(REGISTER)}
                                        color="inherit" startIcon={<VpnKeyIcon/>}>
                                    {t('register.page')}
                                </Button>
                            </ListItem>
                        </List> : null
                    }
                    <Divider/>
                    <List>
                        <TopMenuListItems authenticated={props.authenticated} handleClose={handleClose}/>
                    </List>
                </div>
            </Drawer>
        </>
    );

}

TopDrawer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default withRouter(TopDrawer);
