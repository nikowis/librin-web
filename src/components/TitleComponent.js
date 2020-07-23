import React from 'react';
import PropTypes from "prop-types";

function TitleComponent(props) {

    return (
        <h1 className={'title-component'}>
            {props.content}
        </h1>
    );
}

TitleComponent.propTypes = {
    content: PropTypes.string.isRequired,
};

export default TitleComponent;