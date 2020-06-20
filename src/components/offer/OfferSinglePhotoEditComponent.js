import React from 'react';
import PropTypes from "prop-types";
import PhotoPreviewComponent from "./../PhotoPreviewComponent";

function OfferSinglePhotoEditComponent(props) {
    const {onFileUpload, photo, index} = props;

    const inputId = 'photo' + index;
    return (
        <div className={'offer-single-photo-edit-component'}>
            <input
                accept="image/*"
                id={inputId}
                style={{display: 'none'}}
                onChange={(event) => {
                    onFileUpload(event, index);
                }}
                type="file"
            />
            <label htmlFor={inputId}>
                <PhotoPreviewComponent photo={photo}/>
            </label>
        </div>
    )
}

OfferSinglePhotoEditComponent.propTypes = {
    photo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    onFileUpload: PropTypes.func.isRequired,
    idx: PropTypes.number.isRequired
};

export default OfferSinglePhotoEditComponent