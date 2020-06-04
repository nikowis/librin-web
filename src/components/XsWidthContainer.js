import React from 'react';
import Container from "@material-ui/core/Container";

function XsWidthContainer({children}) {
    return (
        <Container maxWidth={'xs'} style={{padding: 0}}>
            {children}
        </Container>
    );
}

export default XsWidthContainer;
