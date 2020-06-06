import React from 'react';
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import {formatDateToString} from "../../common/date-utility";


function ConversationComponent(props) {

    const {currentConversation, userId} = props;
    const {messages} = currentConversation;

    const messageRows = () => {
        return messages.map((msg) => {
            const myMsg = msg.createdBy.toString() === userId.toString();
            return (
                <ListItem key={msg.id} className={myMsg? 'my-message' : 'notmy-message'}>
                    <div className={'message-datetime'}>
                        {formatDateToString(msg.createdAt, true, true)}
                    </div>
                    <div className={'message-content'}>
                        {msg.content}
                    </div>
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
