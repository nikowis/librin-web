import {Backdrop, Grid} from '@material-ui/core';
import PropTypes from "prop-types";
import React from 'react';
import {photoPropType} from "common/prop-types";

function OfferPhotosComponent(props) {
    const {photos} = props;
    const [open, setOpen] = React.useState(false);
    const [index, setIndex] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    const openFullscreen = (idx) => {
        setOpen(true);
        setIndex(idx);
    };

    const photoGridItem = (xsSize, photoIndex) => <Grid item xs={xsSize}>
        <div className={'background-img'} onClick={() => openFullscreen(photoIndex)} style={{backgroundImage: "url(" + photos[photoIndex].url + ")"}}/>
    </Grid>;

    const singlePhoto = () => photoGridItem(12, 0);

    const doublePhoto = () => <>
        {photoGridItem(6, 0)}
        {photoGridItem(6, 1)}
    </>;

    const multiPhoto = () => <>
        {photoGridItem(6, 0)}
        <Grid item xs={6}>
            <Grid container style={{height: '100%'}}>
                {photoGridItem(12, 1)}
                {photoGridItem(12, 2)}
            </Grid>
        </Grid>
    </>;

    return (
        <>
            <Grid container className={'photos-preview'}>
                {photos.length === 1 ? singlePhoto() :(photos.length === 2 ? doublePhoto() : multiPhoto())}
            </Grid>
            <Backdrop style={{zIndex: 999,color: '#fff',}} open={open} onClick={handleClose}>
                <div className={'fullscreen-photo'}>
                    <div className={'background-img'} style={{backgroundImage: "url(" + photos[index].url + ")"}}/>
                </div>
            </Backdrop>
        </>
    );
}

OfferPhotosComponent.propTypes = {
    photos: PropTypes.arrayOf(photoPropType),
};

export default OfferPhotosComponent;
