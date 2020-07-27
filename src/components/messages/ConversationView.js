import React, {useEffect} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import MessagesListComponent from "./MessagesListComponent";
import Api from "../../common/api-communication";
import SendMessageFormComponent from "./SendMessageFormComponent";
import ConversationOfferPreviewComponent from "./ConversationOfferPreviewComponent";
import LoaderComponent from "../LoaderComponent";
import Divider from "@material-ui/core/Divider";
import MaxWidthContainer from "../MaxWidthContainer";
import UserBannerComponent from "../user/UserBannerComponent";
import {MESSAGES} from "../../common/paths";
import {READ_CONVERSATION} from "../../redux/actions";
import ConversationOfferActions from "./ConversationOfferActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import OfferStatusInfoBanner from "../offer/OfferStatusInfoBanner";
import {Paper} from '@material-ui/core';
import {PAPER_ELEVATION, UserStatus} from './../../common/app-constants'

function ConversationView(props) {

  const [loading, setLoading] = React.useState(false);

  const {dispatch, currentConversation, userId, history} = props;
  const {offer} = currentConversation;
  const propId = currentConversation.id;
  let {convId} = useParams();
  convId = parseInt(convId);
  const invalidId = isNaN(convId);
  if (invalidId) {
    history.push(MESSAGES);
  }
  let recipient = null;
  let isOfferOwner = null;
  if (currentConversation.id) {
    isOfferOwner = userId === currentConversation.offer.ownerId;
    recipient = isOfferOwner ? currentConversation.customer : currentConversation.offer.owner;
  }

  const wrongConvLoaded = !propId || propId !== convId || invalidId;

  useEffect(() => {
    if (!loading && wrongConvLoaded && !invalidId) {
      setLoading(true);
      dispatch(Api.getConversation(convId)).then(res => {
        if (res.action.payload.status === 400) {
          history.replace(MESSAGES);
        }
      }).then(() => setLoading(false));
    }
  }, [dispatch, loading, history, convId, wrongConvLoaded, invalidId]);

  const handleSendMessage = (data, actions) => {
    const {dispatch} = props;
    const content = data.content;
    if (!content || /^\s*$/.test(content)) {
      return;
    }
    actions.setSubmitting(true);
    dispatch(Api.sendMessage(currentConversation.id, content))
        .finally(() => {
          actions.setSubmitting(false);
          actions.resetForm()
        });
  };

  const handleMarkConversationAsRead = () => {
    if (!currentConversation.read) {
      Api.markConversationAsRead(currentConversation.id);
      dispatch({type: READ_CONVERSATION, payload: {id: currentConversation.id}})
    }
  };


  return (
      <MaxWidthContainer size={'sm'}>
        {
          !wrongConvLoaded && currentConversation.id ?
              <ConversationOfferActions/> :
              null
        }

        <Paper elevation={PAPER_ELEVATION} square className={'single-conversation-view'}>
          {
            !wrongConvLoaded && currentConversation.id ?
                <>
                  <UserBannerComponent id={recipient.id} status={recipient.status} username={recipient.username}
                                       withLink/>
                  <Divider variant="fullWidth"/>
                  <ConversationOfferPreviewComponent conversation={currentConversation}/>
                  {currentConversation.messages && currentConversation.messages.length > 0 ?
                      <Divider variant="middle"/> : null}
                  <MessagesListComponent userId={userId}
                                         currentConversation={currentConversation}/>

                  <OfferStatusInfoBanner offer={offer} userId={userId} otherUserId={recipient.id}/>

                  <Divider variant="fullWidth"/>
                  <SendMessageFormComponent onSendMessage={handleSendMessage} disabled={recipient.status === UserStatus.DELETED}
                                            onClick={handleMarkConversationAsRead}/>
                </> :
                <LoaderComponent/>
          }
        </Paper>
      </MaxWidthContainer>
  );
}

ConversationView.propTypes = {
  userId: PropTypes.number,
  currentConversation:
      PropTypes.shape({
        id: PropTypes.number,
        read: PropTypes.bool,
        messages: PropTypes.array,
        offer: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          author: PropTypes.string,
          price: PropTypes.string,
          status: PropTypes.string,
          ownerId: PropTypes.number,
          soldToMe: PropTypes.bool,
          owner: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
          })
        }),
        createdAt: PropTypes.string,
        customer: PropTypes.shape({
          id: PropTypes.number.isRequired,
          username: PropTypes.string.isRequired,
        })
      }),
};

export default connect(state => ({
  userId: state.me.id,
  currentConversation: state.messages.currentConversation,
}))(withRouter(ConversationView));
