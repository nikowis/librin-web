import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {OfferStatus} from "../../common/app-constants";
import DialogButton from "./DialogButton";
import Api from "../../common/api-communication";
import {connect} from "react-redux";

function ConversationOfferActions(props) {

    const {t} = useTranslation();
    const {currentConversation, userId, dispatch} = props;
    const {offer} = currentConversation;

    const customer = currentConversation.customer;
    const userIsOfferOwner = userId !== customer.id;
    const customerUsername = customer.username;

    const handleSellOffer = () => {
        dispatch(Api.sellOffer(offer.id, customer.id));
    };

    return (
        <>
            {
                userIsOfferOwner && OfferStatus.ACTIVE === offer.status ?
                    <div className={'signle-conversation-offer-actions'}>
                        <DialogButton className={'sell'}
                                      size={"small"}
                                      variant={"outlined"}
                                      buttonText={t('offer.sell')}
                                      dialogFullWidth={true}
                                      dialogMaxWidth={'xs'}
                                      dialogTitle={t('offer.sellDialog.title')}
                                      dialogContent={t('offer.sellDialog.content', {'username': customerUsername})}
                                      dialogYesText={t('offer.sellDialog.yesText')}
                                      onYesClick={handleSellOffer}

                        />
                    </div> : null
            }
        </>
    );
}

ConversationOfferActions.propTypes = {
    userId: PropTypes.number,
    currentConversation:
        PropTypes.shape({
            id: PropTypes.number,
            read: PropTypes.bool,
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
}))(ConversationOfferActions);

