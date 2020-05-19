import React from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import TopMenuListItems from "./TopMenuListItems";
import Divider from "@material-ui/core/Divider";
import {useTranslation} from "react-i18next";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";

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
                    <div className={'top-menu-drawer-first-row'}>
                        <Typography variant="h6">
                            {t('menu')}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
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
