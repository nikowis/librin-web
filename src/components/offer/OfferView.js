import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoaderView from "../LoaderView";
import {TextField} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button";
import {EDIT_OFFER, HIDE_NOTIFICATION, OFFER_UPDATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {store} from "../../index";
import {NOTIFICATION_DURATION, OfferStatus} from "../../common/app-constants";
import {MESSAGES, MY_OFFERS, OFFERS} from "../../common/paths";

function OfferView(props) {

    const {t} = useTranslation();
    const {dispatch} = props;
    let {id} = useParams();
    const propId = props.id;

    const {history} = props;
    const {title, author, price, ownerId, status} = props.currentOffer;

    useEffect(() => {
        if (!propId || propId.toString() !== id) {
            dispatch(Api.getOffer(id));
        }
    }, [dispatch, id, propId]);

    const handleDelete = () => {
        dispatch(Api.removeOffer(id)).then(res => {
            if (res.action.payload && !res.action.payload.status) {
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerDeleted')});
                setTimeout(() => {
                    store.dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(OFFERS);
            }
        });
    };

    const handleSendMessage = () => {
        dispatch(Api.createConversation(id)).then(res => {
            history.push(MESSAGES + '/' + res.value.id);
        });
    };

    const handleSold = () => {
        dispatch(Api.offerSold(id)).then(res => {
            if (!res.status) {
                dispatch({type: OFFER_UPDATED, payload: res});
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerUpdated')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(MY_OFFERS);
            }
        });
    };

    const handleEdit = () => {
        dispatch({type: EDIT_OFFER, payload: props.currentOffer});
        props.history.push(MY_OFFERS + '/' + id);
    };

    const getView = () => {
        return (
            <>
                <div>
                    <TextField
                        label={t('id')}
                        name="id"
                        value={id}
                        disabled={true}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label={t('title')}
                        name="title"
                        value={title}
                        disabled={true}
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label={t('author')}
                        name="author"
                        value={author}
                        disabled={true}
                    />
                </div>
                <div>
                    <CurrencyTextField
                        label={t('price')}
                        name="price"
                        minimumValue={"0"}
                        value={price}
                        currencySymbol={t('currencySymbol')}
                        outputFormat="string"
                        decimalCharacter="."
                        decimalCharacterAlternative=","
                        decimalPlacesShownOnBlur={2}
                        digitGroupSeparator={""}
                        disabled={true}
                        margin="normal"
                    />
                </div>
                <div>
                    {ownerId !== props.userId ?
                        <Button variant="contained" color="primary" type="submit" onClick={() => handleSendMessage()}>
                            {t('offers.view.message')}
                        </Button> :
                        (OfferStatus.ACTIVE === status ?
                                <>
                                    <Button variant="contained" color="primary" type="submit"
                                            onClick={() => handleEdit()}>
                                        {t('offers.view.edit')}
                                    </Button>
                                    <br/>

                                    <Button variant="contained" color="primary" type="submit"
                                            onClick={() => handleSold()}>
                                        {t('offers.view.sold')}
                                    </Button>

                                    <br/>
                                    <Button variant="contained" color="secondary" type="submit"
                                            onClick={() => handleDelete()}>
                                        {t('offers.view.delete')}
                                    </Button>
                                </>
                                : null
                        )
                    }
                </div>
            </>
        );
    };

    return (
        <Card>
            {!title || id.toString() !== id ? <LoaderView/> : getView()}
        </Card>
    );
}

OfferView.propTypes = {
    userId: PropTypes.number,
    currentOffer:
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            author: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            ownerId: PropTypes.number,
        }),

};

export default connect(state => ({
    userId: state.user.id,
    currentOffer: state.offers.currentOffer
}))(withRouter(OfferView));