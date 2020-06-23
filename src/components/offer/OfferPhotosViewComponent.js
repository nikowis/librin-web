import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

function OfferPhotosViewComponent(props) {
    const {photos} = props;

    return (
        <div className={'photo-preview'}>

        </div>
    )
}

OfferPhotosViewComponent.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }),
    ),
};

export default OfferPhotosViewComponent;
