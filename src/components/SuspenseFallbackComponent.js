import React, {Suspense} from 'react';
import PropTypes from "prop-types";

// return fallback gui when translations are not yet loaded
function SuspenseFallbackComponent(props) {
    return (
        <Suspense fallback={<div/>}>
            {props.children}
        </Suspense>
    );
}

SuspenseFallbackComponent.propTypes = {
    children: PropTypes.node.isRequired
};

export default SuspenseFallbackComponent;