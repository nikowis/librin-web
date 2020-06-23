import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

function EmptyPhotoPreviewComponent(props) {

    return (
        <div className={'empty-photo-preview centeredContainer'}>
            <PhotoCameraIcon/>
        </div>
    )
}

export default EmptyPhotoPreviewComponent;
