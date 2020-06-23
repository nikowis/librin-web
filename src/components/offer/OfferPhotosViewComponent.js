import React from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import { Grid } from '@material-ui/core';

function OfferPhotosViewComponent(props) {
    const {photos} = props;

    const singlePhoto = () => <>
        <Grid item xs={12}>
                            <div className={'background-img'} style={{backgroundImage: "url(" + photos[0].url + ")"}}/>
        </Grid>
    </>;

    const doublePhoto = () => <>
        <Grid item xs={6}>
            <div className={'background-img'} style={{backgroundImage: "url(" + photos[0].url + ")"}}/>
        </Grid>
        <Grid item xs={6}>
            <div className={'background-img'} style={{backgroundImage: "url(" + photos[1].url + ")"}}/>
        </Grid>
    </>;

    const multiPhoto = () => <>
        <Grid item xs={6}>
            <div className={'background-img'} style={{backgroundImage: "url(" + photos[0].url + ")"}}/>
        </Grid>
        <Grid item xs={6}>
            <Grid container style={{height: '100%'}}>
                <Grid item xs={12}>
                    <div className={'background-img'} style={{backgroundImage: "url(" + photos[1].url + ")"}}/>
                </Grid>
                <Grid item xs={12}>
                    <div className={'background-img'} style={{backgroundImage: "url(" + photos[2].url + ")"}}/>
                </Grid>
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
