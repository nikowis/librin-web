import React from 'react';
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

function MaxWidthContainer(props) {
    return (
        <Container maxWidth={props.size} style={{padding: 0}}>
            {props.children}
        </Container>
    );
}

MaxWidthContainer.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default MaxWidthContainer;
