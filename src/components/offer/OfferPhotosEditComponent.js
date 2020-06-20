import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {compressFile, loadFileToAttachmentObject, validateFile} from "../../common/attachment-utility";
import {API_ERROR, CLEAR_API_ERROR} from "../../redux/actions";
import {API_ERROR_NOTIFICATION_DURATION} from "../../common/app-constants";
import OfferSinglePhotoEditComponent from "./OfferSinglePhotoEditComponent";

function OfferPhotosEditComponent(props) {
    const {setFieldValue, photos} = props;

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
                    setFieldValue("photos", photos);
                }).catch(e => {
                    props.dispatch({
                        type: API_ERROR
                        , payload: t(e.message)
                    });
                    setTimeout(() => {
                        props.dispatch({type: CLEAR_API_ERROR})
                    }, API_ERROR_NOTIFICATION_DURATION);
                }
            );
        })
    };

    let photoIdx = 0;

    const photosInputs = photos ? photos.map((photo, idx) => {
        return (
            <OfferSinglePhotoEditComponent key={idx} photo={photo} index={idx} onFileUpload={handleUploadFile}/>
        )
    }) : [];

    if(photosInputs.length < 3) {
        photosInputs.push(<OfferSinglePhotoEditComponent key={photosInputs.length} index={photosInputs.length} onFileUpload={handleUploadFile}/>);
    }

    return (
        <div className={'offer-photos-edit-component'}>
            {photosInputs}
        </div>
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
    setFieldValue: PropTypes.func
};

export default OfferPhotosEditComponent