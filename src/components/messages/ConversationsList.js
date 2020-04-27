import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card/Card";
import {SELECT_CONVERSATION} from "../../redux/actions";
import {MESSAGES} from "../../common/paths";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

function ConversationsList(props) {

    const {t} = useTranslation();
    const {conversations} = props;
    let {convId} = useParams();
    const {dispatch, history} = props;

    useEffect(() => {
        if (conversations === null) {
            dispatch(Api.getAllConversations());
        }
    }, [dispatch, conversations]);

    const redirect = (conversationId) => {
        dispatch({type: SELECT_CONVERSATION, payload: conversationId});
        history.push(MESSAGES + '/' + conversationId);
    };

    useEffect(() => {
        if (conversations !== null && conversations.length && !convId) {
            redirect(conversations[0].id);
        }
    }, [dispatch, conversations, convId]);

    const conversationRows = () => {
        return conversations.map((conv) => { return (
            <ListItem selected={conv.id.toString() === convId} button key={conv.id} onClick={() => redirect(conv.id)}>
                <ListItemText primary={'Conversation ' + conv.id} secondary={conv.updatedAt} />
            </ListItem>
        )});
    };

    return (
        <Card>
            {t('messages.conversationsList')}
            { conversations ?
            <List>
                {conversationRows()}
            </List> : null
            }
        </Card>
    );
}

ConversationsList.propTypes = {
    conversations: PropTypes.arrayOf(
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
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    conversations: state.messages.content,
    currentPage: state.messages.currentPage,
    totalPages: state.messages.totalPages
}))(withRouter(ConversationsList));