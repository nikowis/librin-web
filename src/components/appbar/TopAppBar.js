import React from 'react';
import '../../App.scss';
import {connect} from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import SearchComponent from "./SearchComponent";
import Menu from "./Menu";

function TopAppBar(props) {

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                    <SearchComponent/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Menu authenticated={props.authenticated} onClose={handleDrawerClose}/>
            </Drawer>
        </div>
    );


}

TopAppBar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(withRouter(TopAppBar));
