import React, {useEffect} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import ConversationComponent from "./ConversationComponent";
import Card from "@material-ui/core/Card/Card";
import Api from "../../common/api-communication";
import SendMessageFormComponent from "./SendMessageFormComponent";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ConversationOfferPreviewComponent from "./ConversationOfferPreviewComponent";
import LoaderComponent from "../LoaderComponent";
import Divider from "@material-ui/core/Divider";
import XsWidthContainer from "../XsWidthContainer";

function MessagesView(props) {

    const {dispatch, currentConversation, userId} = props;
    const propId = currentConversation.id;
    let {convId} = useParams();

    useEffect(() => {
        if (convId && (!propId || propId.toString() !== convId)) {
            dispatch(Api.getConversation(convId));
        }
    }, [dispatch, convId, propId]);

    const handleSendMessage = (data, actions) => {
        const {dispatch} = props;
        actions.setSubmitting(true);
        dispatch(Api.sendMessage(currentConversation.id, data.content))
            .finally(() => {
                actions.setSubmitting(false)
                actions.resetForm()
            });
    };

    return (
        <XsWidthContainer>
            <Card className={'single-conversation-view'}>
                {
                    currentConversation.id ?
                        <List>
                            <ConversationOfferPreviewComponent conversation={currentConversation}/>
                            {currentConversation.messages && currentConversation.messages.length > 0 ? <Divider variant="middle"/> : null}
                            <ConversationComponent userId={userId} currentConversation={currentConversation}/>
                            <Divider variant="fullWidth"/>
                            <SendMessageFormComponent onSendMessage={handleSendMessage}/>
                        </List> :
                        <LoaderComponent/>
                }
            </Card>
        </XsWidthContainer>
    );
}

MessagesView.propTypes = {
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
        }),
};

export default connect(state => ({
    userId: state.me.id,
    currentConversation: state.messages.currentConversation,
}))(withRouter(MessagesView));
