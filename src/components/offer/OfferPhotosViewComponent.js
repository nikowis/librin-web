import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

function PhotoPreviewComponent(props) {
    const {photo} = props;

    const {t} = useTranslation();

    return (
        <div className={'photoPreview centeredContainer'}>
            {photo && photo.url ?
                <img src={photo.url} alt={"Offer"}/>
                : <>
                    <PhotoCameraIcon/>
                    {props.edit ? <div>
                        {t('photo.upload')}
                    </div> : null}
                </>
            }
        </div>
    )
}

PhotoPreviewComponent.propTypes = {
    photo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    edit: PropTypes.bool
};

export default PhotoPreviewComponent;
