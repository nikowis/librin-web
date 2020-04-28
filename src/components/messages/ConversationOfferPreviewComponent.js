import React from 'react';
import '../../App.scss';
import {useTranslation} from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PropTypes from "prop-types";
import {LocalOffer} from "@material-ui/icons";

function ConversationOfferPreviewComponent(props) {

    const {t} = useTranslation();
    const {conversation} = props;

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <LocalOffer/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={conversation.offer.title + ', ' + conversation.offer.author} secondary={conversation.offer.price + t('currencySymbol')} />
        </ListItem>
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
            createdAt: PropTypes.string
        }),
};

export default ConversationOfferPreviewComponent;
