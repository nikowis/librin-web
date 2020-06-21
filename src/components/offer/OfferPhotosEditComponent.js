import React from 'react';
import PropTypes from "prop-types";
import {compressFile, loadFileToAttachmentObject, validateFile} from "../../common/attachment-utility";
import OfferSinglePhotoEditComponent from "./OfferSinglePhotoEditComponent";
import {InputLabel} from "@material-ui/core";

function OfferPhotosEditComponent(props) {
    const {setFieldValue, photos, handlePhotoError} = props;

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
                    setFieldValue("photos", photos);
                }).catch(e => {
                    handlePhotoError(e);
                }
            );
        })
    };

    const handleRemovePhoto = (idx) => {
        photos.splice(idx, 1);
        setFieldValue("photos", photos);
    };

    const photosInputs = photos ? photos.map((photo, idx) => {
        return (
            <OfferSinglePhotoEditComponent key={idx} photo={photo} index={idx}
                                           onFileUpload={handleUploadFile}
                                            onRemovePhoto={handleRemovePhoto}
            />
        )
    }) : [];

    if (photosInputs.length < 3) {
        photosInputs.push(<OfferSinglePhotoEditComponent key={photosInputs.length} index={photosInputs.length}
                                                         onFileUpload={handleUploadFile} onRemovePhoto={()=>{}}/>);
    }

    return (
        <>
            <InputLabel className={'offer-photos-edit-component-label'}>
                Dodaj do 3 zdjęć
            </InputLabel>
            <div className={'offer-photos-edit-component'}>
                {photosInputs}
            </div>
        </>
    )
}

OfferPhotosEditComponent.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }),
    ),
    setFieldValue: PropTypes.func.isRequired,
    handlePhotoError: PropTypes.func.isRequired,
};

export default OfferPhotosEditComponent;