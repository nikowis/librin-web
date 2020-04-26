import React from 'react';
import '../../App.scss';
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import ConversationComponent from "./ConversationComponent";
import ConversationsList from "./ConversationsList";

function MessagesView(props) {

    const {t} = useTranslation();
    const {dispatch} = props;
    let {id} = useParams();
    const propId = props.id;
    const {history} = props;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <ConversationsList currentId={id}/>
            </Grid>
            <Grid item xs={12} md={8}>
                <ConversationComponent currentId={id}/>
            </Grid>
        </Grid>
    );
}

MessagesView.propTypes = {

};

export default connect(state => ({
    id: state.messages.currentConversation.id
}))(withRouter(MessagesView));
