import React from 'react';
import '../../App.scss';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import ConversationComponent from "./ConversationComponent";
import ConversationsList from "./ConversationsList";

function MessagesView(props) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <ConversationsList />
            </Grid>
            <Grid item xs={12} md={8}>
                <ConversationComponent />
            </Grid>
        </Grid>
    );
}

MessagesView.propTypes = {

};

export default connect(state => ({
}))(withRouter(MessagesView));
