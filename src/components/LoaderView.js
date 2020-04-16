import React from 'react';
import '../App.scss';
import {useTranslation} from "react-i18next";
import CircularProgress from "@material-ui/core/CircularProgress";

function LoaderView() {
    const {t} = useTranslation();

    return (
        <>
            <CircularProgress/>
            {t('loading')}
        </>
    );
}

LoaderView.propTypes = {};

export default LoaderView;