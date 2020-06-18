import React from 'react';
import PropTypes from "prop-types";

function WarningStrip(props) {

    const {text} = props;
    const classNames = 'warning-strip ' + (props.type ? props.type : '');
    return (
        <div className={classNames}>
            {text}
        </div>
    );

}

WarningStrip.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default WarningStrip;