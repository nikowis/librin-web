import React from 'react';
import PropTypes from "prop-types";
import {compressFile, loadFileToAttachmentObject, validateFile} from "common/attachment-utility";
import SinglePhotoInput from "components/input/SinglePhotoInput";
import {InputLabel} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {photoPropType} from "common/prop-types";

function MultiPhotosInput(props) {
    const {onChange, photos, handlePhotoError} = props;

    const {t} = useTranslation();

    const handleUploadFile = (e, idx) => {
        const files = e.target.files;
        Object.keys(files).forEach(i => {
            const file = files[i];
            new Promise(resolve => loadFileToAttachmentObject(resolve, file))
                .then(file => {
                    return validateFile(file);
                })
                .then(file => {
                    return compressFile(file);
                })
                .then(file => {
                    photos[idx] = file;
                    onChange(photos);
                }).catch(e => {
                    handlePhotoError(e);
                }
            );
        })
    };

    const handleRemovePhoto = (idx) => {
        photos.splice(idx, 1);
        onChange(photos);
    };

    const photosInputs = photos ? photos.map((photo, idx) => {
        return (
            <SinglePhotoInput key={idx} photo={photo} index={idx}
                              onFileUpload={handleUploadFile}
                              onRemovePhoto={handleRemovePhoto}
            />
        )
    }) : [];

    if (photosInputs.length < 3) {
        photosInputs.push(<SinglePhotoInput key={photosInputs.length} index={photosInputs.length}
                                            onFileUpload={handleUploadFile} onRemovePhoto={()=>{}}/>);
    }

    return (
        <>
            <InputLabel className={'input-label'}>
                {t('photo.uploadHint')}
            </InputLabel>
            <div className={'offer-photos-edit-component'}>
                {photosInputs}
            </div>
        </>
    )
}

MultiPhotosInput.propTypes = {
    photos: PropTypes.arrayOf(photoPropType),
    onChange: PropTypes.func.isRequired,
    handlePhotoError: PropTypes.func.isRequired,
};

export default MultiPhotosInput;