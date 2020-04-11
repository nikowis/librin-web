import React from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {HOME, LOGIN, LOGOUT, PROFILE, REGISTER, ROOT} from "../common/paths";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap"
import {useTranslation} from 'react-i18next';
import {Button} from "react-bootstrap";
import {CHANGE_LANG} from '../redux/actions'
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

function TopMenu(props) {

    const { t, i18n } = useTranslation();

    const changeLang = (lang) => {
        const {dispatch} = props;
        i18n.changeLanguage(lang);
        dispatch({type: CHANGE_LANG, payload: lang});
    };

    const languageButton =
        <>
            {props.lang !== 'pl' ? <Button className="lang-button" variant="outline-info" onClick={() => changeLang('pl')}>PL</Button> : null}
            {props.lang !== 'en' ? <Button className="lang-button" variant="outline-info" onClick={() => changeLang('en')}>EN</Button> : null}
        </>;

    const currentPathname = props.history.location.pathname

    return (
        <div className="top-menu">
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand href={ROOT}>{t('brand')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {props.authenticated ?
                        <Nav className="mr-auto" activeKey={currentPathname}>
                            <LinkContainer to={HOME}>
                                <Nav.Link>{t('home.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={PROFILE}>
                                <Nav.Link>{t('profile.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={LOGOUT}>
                                <Nav.Link>{t('logout')}</Nav.Link>
                            </LinkContainer>
                            {languageButton}
                        </Nav>
                        : <Nav className="mr-auto" activeKey={currentPathname}>
                            <LinkContainer to={HOME}>
                                <Nav.Link>{t('home.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={LOGIN}>
                                <Nav.Link>{t('login.page')}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={REGISTER}>
                                <Nav.Link>{t('register.page')}</Nav.Link>
                            </LinkContainer>
                            {languageButton}
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );


}

TopMenu.propTypes = {
    login: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
    authError: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired
};

export default connect(state => ({
    login: state.user.login,
    authenticated: state.user.authenticated,
    authError: state.app.authError,
    lang: state.user.lang
}))(withRouter(TopMenu));
