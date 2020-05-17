import React from 'react';
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


function ConversationComponent(props) {

    const {currentConversation, userId} = props;
    const {messages} = currentConversation;

    const messageRows = () => {
        return messages.map((msg) => {
            const myMsg = msg.createdBy.toString() === userId.toString();
            const styles  = myMsg ? {  textAlign: 'right'} : {};
            return (
                <ListItem key={msg.id} selected={myMsg}>
                    <ListItemText primary={msg.content} secondary={new Date(msg.createdAt).toLocaleString()} style={styles}/>
                </ListItem>
            )
        });
    };

    return (
        <>
            {messageRows()}
        </>
    );
}

ConversationComponent.propTypes = {
    userId: PropTypes.number,
    currentConversation:
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
        })
};

export default ConversationComponent;
