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
import MaxWidthContainer from "../MaxWidthContainer";
import UserBannerComponent from "../user/UserBannerComponent";

function MessagesView(props) {

    const {dispatch, currentConversation, userId} = props;
    const propId = currentConversation.id;
    let {convId} = useParams();
    let recipient = null;
    if(currentConversation.id) {
        recipient = userId === currentConversation.customer.id ? currentConversation.offer.owner : currentConversation.customer;
    }

    useEffect(() => {
        if (convId && (!propId || propId.toString() !== convId)) {
            dispatch(Api.getConversation(convId));
        }
    }, [dispatch, convId, propId]);

    const handleSendMessage = (data, actions) => {
        const {dispatch} = props;
        const content = data.content;
        if(!content || /^\s*$/.test(content)) {
            return;
        }
        actions.setSubmitting(true);
        dispatch(Api.sendMessage(currentConversation.id, content))
            .finally(() => {
                actions.setSubmitting(false);
                actions.resetForm()
            });
    };

    return (
        <MaxWidthContainer size={'sm'}>
            <Card className={'single-conversation-view'}>
                {
                    currentConversation.id ?
                        <List>
                            <UserBannerComponent username={recipient.username}/>
                            <Divider variant="fullWidth"/>
                            <ConversationOfferPreviewComponent conversation={currentConversation}/>
                            {currentConversation.messages && currentConversation.messages.length > 0 ? <Divider variant="middle"/> : null}
                            <ConversationComponent userId={userId} currentConversation={currentConversation}/>
                            <Divider variant="fullWidth"/>
                            <SendMessageFormComponent onSendMessage={handleSendMessage}/>
                        </List> :
                        <LoaderComponent/>
                }
            </Card>
        </MaxWidthContainer>
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
}))(withRouter(MessagesView));
