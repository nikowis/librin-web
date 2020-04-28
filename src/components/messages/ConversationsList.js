import React from 'react';
import '../../App.scss';
import {useParams} from 'react-router-dom';
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

function ConversationsList(props) {
    let {convId} = useParams();
    const {onConversationClick, conversations, userId} = props;

    const conversationRows = () => {
        return conversations.map((conv) => {
            const recipientUsername = conv.customer.id === userId ? conv.offer.owner.login : conv.customer.login;
            return (
                <ListItem selected={conv.id.toString() === convId} button key={conv.id}
                          onClick={() => onConversationClick(conv.id)}>
                    <ListItemText primary={recipientUsername} secondary={conv.offer.title + ', ' + conv.offer.author}/>
                </ListItem>
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
    onConversationClick: PropTypes.func
};

export default ConversationsList;