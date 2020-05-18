import React from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import TopMenuListItems from "./TopMenuListItems";

function TopDrawer(props) {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const handleClose = (event) => {
        toggleDrawer(false)(event);
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
