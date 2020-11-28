import {Paper} from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PropTypes from "prop-types";
import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import Api from "../../common/api-communication";
import {PAPER_ELEVATION} from '../../common/app-constants';
import {READ_CONVERSATION} from "../../redux/actions";
import LoaderComponent from "../LoaderComponent";
import MaxWidthContainer from "../MaxWidthContainer";
import ConversationsList from "./ConversationsList";

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

  const prevConversationLoader = currentPage > 1 ?
      <div className={'MuiButtonBase-root button'} onClick={() => loadPrevConversations()}>
        <ArrowBackIosIcon/>
        {t('messages.newer')}
      </div> :
      <div className={'MuiButtonBase-root button disabled'}>
        <ArrowBackIosIcon/>
        {t('messages.newer')}
      </div>;

  const nextConversationLoader = currentPage >= totalPages ?
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
        <Paper elevation={PAPER_ELEVATION} square className={'list-paging-navigation'}>
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
        </Paper>
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
  conversations: state.conversations.content,
  currentPage: state.conversations.currentPage,
  totalPages: state.conversations.totalPages,
  mustReload: state.conversations.mustReload
}))(withRouter(ConversationsView));
