import React from 'react';
import '../App.scss';
import PropTypes from "prop-types";
import {CHANGE_LANG} from "../../redux/actions";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";

function ChangeLangComponent(props) {

    const {i18n} = useTranslation();

    const changeLang = (lang) => {
        const {dispatch} = props;
        i18n.changeLanguage(lang);
        dispatch({type: CHANGE_LANG, payload: lang});
    };

    return <>
        {props.lang !== 'pl' ? <Button onClick={() => changeLang('pl')}>PL</Button> : null}
        {props.lang !== 'en' ? <Button onClick={() => changeLang('en')}>EN</Button> : null}
    </>;


}

ChangeLangComponent.propTypes = {
    lang: PropTypes.string.isRequired
};

export default connect(state => ({
    lang: state.user.lang
}))(ChangeLangComponent);
