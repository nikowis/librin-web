import React, {useEffect} from 'react';
import {Link, useParams, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import MessagesListComponent from "./MessagesListComponent";
import Card from "@material-ui/core/Card/Card";
import Api from "../../common/api-communication";
import SendMessageFormComponent from "./SendMessageFormComponent";
import PropTypes from "prop-types";
import ConversationOfferPreviewComponent from "./ConversationOfferPreviewComponent";
import LoaderComponent from "../LoaderComponent";
import Divider from "@material-ui/core/Divider";
import MaxWidthContainer from "../MaxWidthContainer";
import UserBannerComponent from "../user/UserBannerComponent";
import {MESSAGES, USERS} from "../../common/paths";

function MessagesView(props) {

    const {dispatch, currentConversation, userId, history} = props;
    const propId = currentConversation.id;
    let {convId} = useParams();
    convId = parseInt(convId);
    const invalidId = isNaN(convId);
    if(invalidId) {
        history.push(MESSAGES);
    }
    let recipient = null;
    if(currentConversation.id) {
        recipient = userId === currentConversation.customer.id ? currentConversation.offer.owner : currentConversation.customer;
    }

    const wrongConvLoaded = !propId || propId !== convId || invalidId;

    useEffect(() => {
        if (convId && (!propId || propId.toString() !== convId)) {
            dispatch(Api.getConversation(convId)).then(res => {
                if(res.action.payload.status === 400) {
                    history.replace(MESSAGES);
                }
            });
        }
    }, [dispatch, history, convId, propId]);

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
                    !wrongConvLoaded && currentConversation.id ?
                        <>
                            <Link to={USERS + '/' + recipient.id} className={'link-no-styles'}>
                                <UserBannerComponent username={recipient.username}/>
                            </Link>
                            <Divider variant="fullWidth"/>
                            <ConversationOfferPreviewComponent conversation={currentConversation}/>
                            {currentConversation.messages && currentConversation.messages.length > 0 ? <Divider variant="middle"/> : null}
                            <MessagesListComponent userId={userId} currentConversation={currentConversation}/>
                            <Divider variant="fullWidth"/>
                            <SendMessageFormComponent onSendMessage={handleSendMessage}/>
                        </> :
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
