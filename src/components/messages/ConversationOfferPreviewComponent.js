import React from 'react';
import {useTranslation} from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {LocalOffer} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {OFFERS} from "common/paths";
import {OfferStatus} from "common/app-constants";
import {conversationPropType} from "common/prop-types";

function ConversationOfferPreviewComponent(props) {

  const {t} = useTranslation();
  const {conversation} = props;

  const offerDeleted = conversation.offer.status === OfferStatus.DELETED;
  const offerDeletedOrInactive = offerDeleted || conversation.offer.status === OfferStatus.INACTIVE;

  const content =
      <ListItem className={'conversation-offer-preview'}>
        <ListItemAvatar>
          <Avatar>
            <LocalOffer/>
          </Avatar>
        </ListItemAvatar>
        {offerDeleted ?
            <ListItemText primary={t('offer.status.deletedWarn')}/> :
            <ListItemText primary={conversation.offer.title + ', ' + conversation.offer.author}
                          secondary={conversation.offer.price + t('currencySymbol')}
            />
        }

      </ListItem>;

  return (
      offerDeletedOrInactive ?
          content :
          <Link to={OFFERS + '/' + conversation.offer.id} className={'link-no-styles'}>
            {content}
          </Link>
  );
}

ConversationOfferPreviewComponent.propTypes = {
  conversation: conversationPropType
};

export default ConversationOfferPreviewComponent;
