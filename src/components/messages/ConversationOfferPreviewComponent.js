import React from 'react';
import {useTranslation} from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PropTypes from "prop-types";
import {LocalOffer} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {OFFERS} from "../../common/paths";
import {OfferStatus} from "../../common/app-constants";

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
  conversation:
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
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      }),
};

export default ConversationOfferPreviewComponent;
