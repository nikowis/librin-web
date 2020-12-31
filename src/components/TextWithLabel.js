import React from 'react';
import PropTypes from "prop-types";

function TextWithLabel({name, mainClass, label, content}) {

    return (
        <div className={'labeled-field ' +  mainClass}>
            <label htmlFor={name}>{label}</label>
            <span id={name}>{content}</span>
        </div>
    );
}

TextWithLabel.propTypes = {
    mainClass: PropTypes.oneOf(['primary-text', 'secondary-text']),
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default TextWithLabel;