import React from 'react';
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';

function OfferSinglePhotoEditComponent(props) {
    const {onFileUpload, photo, index} = props;

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
                <div className={'background-img'} style={{backgroundImage: "url(" + photo.url + ")"}}>

                </div>
                : <label htmlFor={inputId}>
                    <div className={'photo-edit-preview centeredContainer'}>
                        <AddIcon/>
                    </div>
                </label>
            }

        </div>
    )
}

OfferSinglePhotoEditComponent.propTypes = {
    photo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }),
    onFileUpload: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default OfferSinglePhotoEditComponent