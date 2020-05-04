import React from 'react';
import '../App.scss';
import Container from "@material-ui/core/Container";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {compressFile, loadFileToAttachmentObject, validateFile} from "../common/attachment-utility";
import PhotosPreviewComponent from "./PhotosPreviewComponent";

function PhotosInputComponent(props) {
    const {setFieldValue, attachment} = props;

    const {t} = useTranslation();

    const handleUploadFile = (e) => {
        const files = e.target.files;
        Object.keys(files).forEach(i => {
            const file = files[i];
            new Promise(resolve => loadFileToAttachmentObject(resolve, file))
                .then(file => compressFile(file))
                .then(file => validateFile(file))
                .then(file => {
                    setFieldValue("attachment", file);
                });
        })
    };

    return (
        <>
            <input
                accept="image/*"
                id="attachment"
                style={{display: 'none'}}
                onChange={(event) => {
                    handleUploadFile(event, setFieldValue);
                }}
                type="file"
            />

            <Container maxWidth="xs">
                <label htmlFor="attachment">
                    <PhotosPreviewComponent attachment={attachment}/>
                </label>
            </Container>
            {attachment && attachment.name ? attachment.name : t('offers.edit.upload')}
        </>
    )
}

PhotosInputComponent.propTypes = {
    attachment: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    onFileUpload: PropTypes.func,
    setFieldValue: PropTypes.func
};

export default PhotosInputComponent;