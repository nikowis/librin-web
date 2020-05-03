import React from 'react';
import '../App.scss';
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PropTypes from "prop-types";

function PhotosPreviewComponent(props) {
    const {attachment} = props;

    return (
        <>
            <Typography component="div"
                        style={{backgroundColor: '#ebedee', height: '30vh', border: '1px solid gray'}}>
                {attachment && attachment.url ?
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
        </>
    )
}

PhotosPreviewComponent.propTypes = {
    attachment: PropTypes.shape({
        name: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
};

export default PhotosPreviewComponent;