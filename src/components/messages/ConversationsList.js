import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {MESSAGES} from "../../common/paths";

function ConversationsList(props) {
    const {conversations, userId} = props;

    const conversationRows = () => {
        return conversations.map((conv) => {
            const recipientUsername = conv.customer.id === userId ? conv.offer.owner.username : conv.customer.username;
            return (
                <Link to={MESSAGES + '/' + conv.id} key={conv.id} className={"link-no-styles"}>
                    <ListItem className={conv.read ? null : 'conversation-unread'} button >
                        <ListItemText primary={recipientUsername} secondary={conv.offer.title + ', ' + conv.offer.author}/>
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

export default ConversationsList;