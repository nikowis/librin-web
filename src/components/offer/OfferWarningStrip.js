import React from 'react';
import PropTypes from "prop-types";

function OfferWarningStrip(props) {

    const {text} = props;
    return (
        <div className={'offer-warning-strip'}>
            {text}
        </div>
    );

}

OfferWarningStrip.propTypes = {
    text: PropTypes.string.isRequired
};

export default OfferWarningStrip;