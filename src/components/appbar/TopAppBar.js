import React from 'react';
import '../../App.scss';
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
            <Toolbar>
                <Typography variant="h5" >
                    Librin
                </Typography>
                <div id='top-menu-search'>
                    <SearchComponent/>
                </div>

                <IconButton onClick={handleDrawerOpen} edge="end" color="inherit"
                            aria-label="menu">
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
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
