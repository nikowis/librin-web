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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListSubheader from "@material-ui/core/ListSubheader";
import MaxWidthContainer from "../MaxWidthContainer";
import {READ_CONVERSATION} from "../../redux/actions";
import Divider from "@material-ui/core/Divider";

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
        if (!conversation.read) {
            Api.markConversationAsRead(conversation.id);
            dispatch({type: READ_CONVERSATION, payload: {id: conversation.id}})
        }
    };

    let prevConversationLoader = currentPage > 1 ?
        <div className={'MuiButtonBase-root button'} onClick={() => loadPrevConversations()}>
            <ArrowBackIosIcon/>
            {t('messages.newer')}
        </div> :
        <div className={'MuiButtonBase-root button disabled'}>
            <ArrowBackIosIcon/>
            {t('messages.newer')}
        </div>;

    let nextConversationLoader = currentPage >= totalPages ?
        <div className={'MuiButtonBase-root button disabled'}>
            {t('messages.older')}
            <ArrowForwardIosIcon/>
        </div> :
        <div className={'MuiButtonBase-root button'} onClick={() => loadNextConversations()}>
            {t('messages.older')}
            <ArrowForwardIosIcon/>
        </div>
    ;

    return (
        <MaxWidthContainer size={'sm'}>
            <Card className={'conversations-view'}>
                {
                    conversations && !mustReload ?
                        <List subheader={<ListSubheader>{t('messages.conversationsList')}</ListSubheader>}>
                            <ConversationsList userId={userId} conversations={conversations}
                                               onConversationOpen={handleMarkConversationAsRead}/>
                            <Divider variant="fullWidth"/>
                            <div className={'navigation-buttons'}>

                                {prevConversationLoader}
                                {nextConversationLoader}
                            </div>
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
