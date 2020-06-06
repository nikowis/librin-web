import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchComponent from "./SearchComponent";
import withWidth from '@material-ui/core/withWidth';
import TopMenu from "./TopMenu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import {CREATE_OFFER, LOGIN, MESSAGES, OFFERS, PROFILE, REGISTER} from "../../common/paths";
import Button from "@material-ui/core/Button";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {useTranslation} from "react-i18next";
import TopDrawer from "./TopDrawer";
import Badge from "@material-ui/core/Badge";

function TopAppBar(props) {

    const smallScreen = /xs|sm/.test(props.width);
    const verySmallScreen = /xs/.test(props.width);

    const {t} = useTranslation();

    const redirect = (to) => {
        props.history.push(to);
    };

    // console.log(props.width);
    return (
        <>
            <div className="top-menu">
                <Toolbar>
                    <div id="top-menu-left">
                        <Typography variant="h5" onClick={() => redirect(OFFERS)}>
                            {t('brand')}
                        </Typography>
                    </div>
                    <div id='top-menu-middle'>
                        {
                            smallScreen ? null :
                                <SearchComponent selectMenuClassName="search-category-select-menu"/>
                        }
                    </div>
                    <div className="top-menu-right">
                        {props.authenticated ?
                            <>
                                {!verySmallScreen ?
                                    <>
                                        <Button size={"small"} variant="outlined" onClick={() => redirect(CREATE_OFFER)}
                                                color="inherit" startIcon={<AddIcon/>}>
                                            {t('offer.createPage')}
                                        </Button>
                                    </> :
                                    <IconButton
                                        onClick={() => redirect(CREATE_OFFER)}
                                        color={"inherit"}
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                }
                                <IconButton
                                    onClick={() => redirect(MESSAGES)}
                                    color={"inherit"}
                                >
                                    <Badge badgeContent={props.unreadConversations}>
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                {!verySmallScreen ?
                                    <IconButton onClick={() => redirect(PROFILE)}
                                                color={"inherit"}
                                    >
                                        <AccountCircle/>
                                    </IconButton> : null
                                }


                            </> : null
                        }
                        {!props.authenticated ?
                            <>
                                <Button size={"small"} variant="outlined" onClick={() => redirect(LOGIN)}
                                        color="inherit" startIcon={<AccountCircle/>}>
                                    {t('login.page')}
                                </Button>
                                {!verySmallScreen ?
                                    <Button size={"small"} variant="outlined" onClick={() => redirect(REGISTER)}
                                            color="inherit" startIcon={<VpnKeyIcon/>}>
                                        {t('register.page')}
                                    </Button> : null
                                }
                            </> : null
                        }
                        {verySmallScreen ? <TopDrawer authenticated={props.authenticated}/>
                             : <TopMenu authenticated={props.authenticated}/>
                        }

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
    authenticated: state.me.authenticated,
    unreadConversations: state.messages.content ? state.messages.content.filter(conv => conv.read === false).length : 0
}))(withRouter(withWidth()(TopAppBar)));
