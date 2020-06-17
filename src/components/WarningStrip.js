import React from 'react';
import PropTypes from "prop-types";

function WarningStrip(props) {

    const {text} = props;
    return (
        <div className={'warning-strip'}>
            {text}
        </div>
    );

}

WarningStrip.propTypes = {
    text: PropTypes.string.isRequired
};

export default WarningStrip;