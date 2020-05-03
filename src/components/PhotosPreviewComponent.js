import React from 'react';
import '../App.scss';
import Typography from "@material-ui/core/Typography";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PropTypes from "prop-types";

function PhotosPreviewComponent(props) {
    const {attachment} = props;

    return (
        <>
            <Typography component="div"
                        style={{backgroundColor: '#f5f5f5', height: '30vh'}}>
                {attachment && attachment.url ?
                    <div style={{
                        height: '100%', width: '100%',
                        backgroundImage: 'url(' + attachment.url + ')',
                        backgroundSize: '100% 100%'
                    }}
                    /> :
                    <PhotoCameraIcon fontSize={'large'}/>
                }
            </Typography>
        </>
    )
}

PhotosPreviewComponent.propTypes = {
    attachment: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
};

export default PhotosPreviewComponent;