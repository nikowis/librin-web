import React from 'react';
import '../App.scss';
import {useTranslation} from "react-i18next";
import {withRouter} from 'react-router-dom';
import {HOME} from './../common/paths'

function ViewTitle(props) {

    const {t} = useTranslation();

    const translationKey = (pathname) => {
        let key = pathname.substring(1);
        if (!key) {
            key = HOME.substring(1);
        }
        key = key.replace('/', '.');
        return t(key + '.title')
    };

    let pageTitle = translationKey(props.location.pathname);
    return (
        <div className="title-header">
            {pageTitle ? <h5>{pageTitle}</h5> : null}
        </div>
    );
}

ViewTitle.propTypes = {};

export default withRouter(ViewTitle);
