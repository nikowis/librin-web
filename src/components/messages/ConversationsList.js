import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {CONVERSATIONS} from "common/paths";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import {formatDateToString} from "common/date-utility";
import {OfferStatus, UserStatus} from "common/app-constants";
import {useTranslation} from "react-i18next";
import {conversationPropType} from "common/prop-types";

function ConversationsList(props) {
  const {conversations, userId} = props;

  const {t} = useTranslation();

  const conversationRows = () => {
    return conversations.map((conv) => {
      const recipient = conv.customer.id === userId ? conv.offer.owner : conv.customer;
      const accountDeleted = recipient.status === UserStatus.DELETED;
      const recipientUsername = conv.customer.id === userId ? conv.offer.owner.username : conv.customer.username;
      const offerDesc = conv.offer.title + ', ' + conv.offer.author;
      return (
          <Link to={CONVERSATIONS + '/' + conv.id} key={conv.id} className={"link-no-styles"}
                onClick={() => props.onConversationOpen(conv)}>
            <ListItem className={conv.read ? null : 'conversation-unread'} button>
              <div className={'list-datetime'}>
                {formatDateToString(conv.updatedAt, true, true)}
              </div>
              <div className={'list-item'}>
                <ListItemAvatar>
                  {accountDeleted ? <Avatar>{'?'}</Avatar> :
                      <Avatar>{recipientUsername.substring(0, 1).toUpperCase()}</Avatar>}
                </ListItemAvatar>
                <ListItemText primary={accountDeleted ? t('user.accountIsDeleted') : recipientUsername}
                              secondary={conv.offer.status !== OfferStatus.DELETED ? offerDesc : t('offer.status.deletedWarn')}/>
              </div>
            </ListItem>
          </Link>
      );
    });
  };

  return (
      <>
        {conversationRows()}
      </>
  );
}

ConversationsList.propTypes = {
  userId: PropTypes.number,
  conversations: PropTypes.arrayOf(conversationPropType),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onConversationOpen: PropTypes.func.isRequired,
};

export default ConversationsList;