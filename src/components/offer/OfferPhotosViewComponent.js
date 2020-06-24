import React from 'react';
import PropTypes from "prop-types";
import { Grid } from '@material-ui/core';

function OfferPhotosViewComponent(props) {
    const {photos} = props;

    const photoGridItem = (xsSize, photo) => <Grid item xs={xsSize}>
        <div className={'background-img'} style={{backgroundImage: "url(" + photo.url + ")"}}/>
    </Grid>

    const singlePhoto = () => photoGridItem(12, photos[0]);

    const doublePhoto = () => <>
        {photoGridItem(6, photos[0])}
        {photoGridItem(6, photos[1])}
    </>;

    const multiPhoto = () => <>
        {photoGridItem(6, photos[0])}
        <Grid item xs={6}>
            <Grid container style={{height: '100%'}}>
                {photoGridItem(12, photos[1])}
                {photoGridItem(12, photos[2])}
            </Grid>
        </Grid>
    </>;

    return (
        <Grid container className={'photos-preview'}>
            {photos.length === 1 ? singlePhoto() :(photos.length === 2 ? doublePhoto() : multiPhoto())}
        </Grid>
    );
}

OfferPhotosViewComponent.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }),
    ),
};

export default OfferPhotosViewComponent;
