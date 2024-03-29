import React from 'react';
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import {photoPropType} from "common/prop-types";

function SinglePhotoInput(props) {
    const {onFileUpload, photo, index, onRemovePhoto} = props;

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
            {photo && photo.url ?
                <div className={'background-img'} style={{backgroundImage: "url(" + photo.url  + ")"}}>
                    <IconButton size={"small"} className={'remove-button'} onClick={() => onRemovePhoto(index)}>
                        <CancelTwoToneIcon fontSize="small"/>
                    </IconButton>
                </div>
                : <label htmlFor={inputId}>
                    <div className={'photo-edit-preview centered-container'}>
                        <AddIcon/>
                    </div>
                </label>
            }

        </div>
    )
}

SinglePhotoInput.propTypes = {
    photo: photoPropType,
    onFileUpload: PropTypes.func.isRequired,
    onRemovePhoto: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default SinglePhotoInput