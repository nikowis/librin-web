import React from 'react';
import {connect} from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import SearchComponent from "./SearchComponent";
import Menu from "./Menu";
import withWidth from '@material-ui/core/withWidth';


function TopAppBar(props) {

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const smallScreen = /xs|sm/.test(props.width);

    return (
        <>
            <div className="top-menu">
                <Toolbar>
                    <div id="top-menu-left">
                    <Typography variant="h5">
                        Librin
                    </Typography>
                    </div>
                    <div id='top-menu-middle'>
                        {
                            smallScreen ? null :
                                <SearchComponent/>
                        }
                    </div>
                    <div className="top-menu-right">
                    <IconButton onClick={handleDrawerOpen} edge="end" color="inherit"
                                aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    </div>
                </Toolbar>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <Menu authenticated={props.authenticated} onClose={handleDrawerClose}/>
                </Drawer>
            </div>
            {
                smallScreen ?
                    <div className="top-menu-second-row">
                        <SearchComponent/>
                    </div> : null
            }
        </>
    );


}

TopAppBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(withRouter(withWidth()(TopAppBar)));
