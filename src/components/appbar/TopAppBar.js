import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchComponent from "./SearchComponent";
import withWidth from '@material-ui/core/withWidth';
import TopMenu from "./TopMenu";


function TopAppBar(props) {

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
                                <SearchComponent selectMenuClassName="search-category-select-menu"/>
                        }
                    </div>
                    <div className="top-menu-right">
                        <TopMenu authenticated={props.authenticated}/>
                    </div>
                </Toolbar>
            </div>
            {
                smallScreen ?
                    <div className="top-menu-second-row">
                        <SearchComponent selectMenuClassName="search-category-select-menu-second-row"/>
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
