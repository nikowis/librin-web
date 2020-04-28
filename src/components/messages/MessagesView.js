import React, {useEffect} from 'react';
import '../../App.scss';
import {useParams, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import ConversationComponent from "./ConversationComponent";
import ConversationsList from "./ConversationsList";
import Card from "@material-ui/core/Card/Card";
import Api from "../../common/api-communication";
import SendMessageFormComponent from "./SendMessageFormComponent";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ConversationOfferPreviewComponent from "./ConversationOfferPreviewComponent";
import LoaderView from "../LoaderView";
import {SELECT_CONVERSATION} from "../../redux/actions";
import {MESSAGES} from "../../common/paths";
import Divider from "@material-ui/core/Divider";
import {useTranslation} from "react-i18next";

function MessagesView(props) {

    const {dispatch, history, currentConversation, conversations, userId, totalPages} = props;
    const propId = currentConversation.id;
    let {convId} = useParams();
    const {t} = useTranslation();

    const redirect = (conversationId) => {
        dispatch({type: SELECT_CONVERSATION, payload: conversationId});
        history.push(MESSAGES + '/' + conversationId);
    };

    useEffect(() => {
        if (conversations !== null && conversations.length && !convId) {
            dispatch({type: SELECT_CONVERSATION, payload: conversations[0].id});
            history.push(MESSAGES + '/' + conversations[0].id);
        }
    }, [dispatch, history, conversations, convId]);

    useEffect(() => {
        if (conversations === null) {
            dispatch(Api.getAllConversations());
        }
    }, [dispatch, conversations]);

    useEffect(() => {
        if (convId && (!propId || propId.toString() !== convId)) {
            dispatch(Api.getConversation(convId));
        }
    }, [dispatch, convId, propId]);

    const handleSendMessage = (data, actions) => {
        const {dispatch} = props;
        actions.setSubmitting(true);
        dispatch(Api.sendMessage(currentConversation.id, data.content))
            .finally(() => {
                actions.setSubmitting(false)
                actions.resetForm()
            });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    {
                        conversations ?
                            <ConversationsList userId={userId} onConversationClick={redirect} conversations={conversations}/>
                            : <LoaderView/>
                    }
                </Card>
            </Grid>
            <Grid item xs={12} md={8}>
                <Card>
                    {totalPages !== null && totalPages === 0 ? t('messages.nomessages') :
                        currentConversation.id ?
                            <List>
                                <ConversationOfferPreviewComponent conversation={currentConversation}/>
                                <Divider variant="middle"/>
                                <ConversationComponent userId={userId} currentConversation={currentConversation}/>
                                <SendMessageFormComponent onSendMessage={handleSendMessage}/>
                            </List> :
                            <LoaderView/>
                    }
                </Card>
            </Grid>
        </Grid>
    );
}

MessagesView.propTypes = {
    userId: PropTypes.number,
    currentConversation:
        PropTypes.shape({
            id: PropTypes.number,
            messages: PropTypes.array,
            offer: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                author: PropTypes.string,
                price: PropTypes.string,
                status: PropTypes.string,
                ownerId: PropTypes.number,
            }),
            createdAt: PropTypes.string
        }),
    conversations: PropTypes.array
};

export default connect(state => ({
    userId: state.user.id,
    currentConversation: state.messages.currentConversation,
    conversations: state.messages.content,
    currentPage: state.messages.currentPage,
    totalPages: state.messages.totalPages
}))(withRouter(MessagesView));
