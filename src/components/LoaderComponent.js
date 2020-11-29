import React from 'react';
import {useTranslation} from "react-i18next";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

function LoaderComponent(props) {
    const {t} = useTranslation();
    let {size} = props;

    if(!size)  {
      size = 32;
    }

    return (
        <div className={'loader'}>
            <CircularProgress size={size}/>
            {t('loading')}
        </div>
    );
}

LoaderComponent.propTypes = {
  size: PropTypes.number,
};

export default LoaderComponent;