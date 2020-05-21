import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {compressFile, loadFileToAttachmentObject, validateFile} from "../common/attachment-utility";
import PhotosPreviewComponent from "./PhotosPreviewComponent";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

function PhotosInputComponent(props) {
    const {setFieldValue, photo} = props;

    const {t} = useTranslation();

    const handleUploadFile = (e) => {
        const files = e.target.files;
        Object.keys(files).forEach(i => {
            const file = files[i];
            new Promise(resolve => loadFileToAttachmentObject(resolve, file))
                .then(file => compressFile(file))
                .then(file => validateFile(file))
                .then(file => {
                    setFieldValue("photo", file);
                });
        })
    };

    return (
        <div className={'photo-input-component'}>
            <input
                accept="image/*"
                id="photo"
                style={{display: 'none'}}
                onChange={(event) => {
                    handleUploadFile(event, setFieldValue);
                }}
                type="file"
            />

            <div>
                <label htmlFor="photo">
                    <PhotosPreviewComponent photo={photo} edit={true}/>
                </label>
            </div>
            {photo ?
                <Button
                    size={"small"}
                    className={'delete-button'}
                    startIcon={<DeleteIcon/>}
                    onClick={() => setFieldValue("photo", null)}
                >
                    {t('photo.delete')}
                </Button> : null
            }
        </div>
    )
}

PhotosInputComponent.propTypes = {
    photo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    onFileUpload: PropTypes.func,
    setFieldValue: PropTypes.func
};

export default PhotosInputComponent;