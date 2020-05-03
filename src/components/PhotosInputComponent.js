import React from 'react';
import '../App.scss';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {compressFile, loadFileToAttachmentObject, validateFile} from "../common/attachment-utility";

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
                    <Typography component="div"
                                style={{backgroundColor: '#ebedee', height: '30vh', border: '1px solid gray'}}>
                        {attachment ?
                            <div style={{
                                height: '100%', width: '100%',
                                backgroundImage: 'url(' + attachment.url + ')',
                                backgroundSize: '100% 100%',
                                border: '1px black'
                            }}
                            /> :
                            <AddAPhotoIcon fontSize={'large'}/>
                        }
                    </Typography>
                </label>
            </Container>
            {attachment && attachment.name ? attachment.name : t('offers.edit.upload')}
        </>
    )
}

PhotosInputComponent.propTypes = {
    attachment: PropTypes.shape({
        name: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    onFileUpload: PropTypes.func,
    setFieldValue: PropTypes.func
};

export default PhotosInputComponent;