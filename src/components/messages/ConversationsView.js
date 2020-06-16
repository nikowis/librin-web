import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import ConversationsList from "./ConversationsList";
import Card from "@material-ui/core/Card/Card";
import Api from "../../common/api-communication";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import LoaderComponent from "../LoaderComponent";
import {useTranslation} from "react-i18next";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ListSubheader from "@material-ui/core/ListSubheader";
import Fab from "@material-ui/core/Fab";
import MaxWidthContainer from "../MaxWidthContainer";
import {READ_CONVERSATION} from "../../redux/actions";

function ConversationsView(props) {

    const {dispatch, conversations, userId, totalPages, currentPage, mustReload} = props;
    const {t} = useTranslation();

    useEffect(() => {
        if (conversations === null || mustReload) {
            dispatch(Api.getAllConversations());
        }
    }, [dispatch, conversations, mustReload]);

    const loadNextConversations = () => {
        dispatch(Api.getAllConversations(currentPage));
    };

    const loadPrevConversations = () => {
        dispatch(Api.getAllConversations(currentPage - 2));
    };

    const handleMarkConversationAsRead = (conversation) => {
        if(!conversation.read) {
            Api.markConversationAsRead(conversation.id);
            dispatch({type: READ_CONVERSATION, payload: {id: conversation.id}})
        }
    };

    let prevConversationLoader = currentPage > 1 ? (
        <Fab variant="extended" onClick={() => loadPrevConversations()}>
            <KeyboardArrowUpIcon/>
            {t('messages.newer')}
        </Fab>
    ) : null;

    let nextConversationLoader = currentPage >= totalPages ? null : (
        <Fab variant="extended" onClick={() => loadNextConversations()}>
            <KeyboardArrowDownIcon/>
            {t('messages.older')}
        </Fab>
    );

    return (
        <MaxWidthContainer size={'sm'}>
            <Card className={'conversations-view'}>
                {
                    conversations && !mustReload ?
                        <List subheader={<ListSubheader>{t('messages.conversationsList')}</ListSubheader>}>
                            {prevConversationLoader}
                            <ConversationsList userId={userId} conversations={conversations} onConversationOpen={handleMarkConversationAsRead}/>
                            {nextConversationLoader}
                        </List>
                        : <LoaderComponent/>
                }
            </Card>
        </MaxWidthContainer>
    );
}

ConversationsView.propTypes = {
    userId: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    mustReload: PropTypes.bool.isRequired,
    conversations: PropTypes.array
};

export default connect(state => ({
    userId: state.me.id,
    conversations: state.messages.content,
    currentPage: state.messages.currentPage,
    totalPages: state.messages.totalPages,
    mustReload: state.messages.mustReload
}))(withRouter(ConversationsView));
