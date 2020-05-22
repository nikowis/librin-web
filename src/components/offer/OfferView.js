import React, {useEffect} from 'react';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoaderComponent from "../LoaderComponent";
import Card from "@material-ui/core/Card/Card";
import {CLEAR_CURRENT_OFFER} from "../../redux/actions";
import {MESSAGES} from "../../common/paths";

function OfferView(props) {

    const {t} = useTranslation();
    const {dispatch} = props;
    let {id} = useParams();
    const propId = props.id;

    const {history} = props;
    const {title, author, price, ownerId, status, attachment} = props.currentOffer;

    useEffect(() => {
        if (!propId || propId.toString() !== id) {
            dispatch({type: CLEAR_CURRENT_OFFER});
            dispatch(Api.getOffer(id));
        }
    }, [dispatch, id, propId]);

    const handleSendMessage = () => {
        dispatch(Api.createConversation(id)).then(res => {
            history.push(MESSAGES + '/' + res.value.id);
        });
    };

    const getView = () => {
        return (
            <div className={'offer-view'}>
                <img src={attachment.url} alt={"Offer"}/>
                <Card className={'offer-info-card'}>
                    Some content
                </Card>
            </div>
        );
    };

    return (
        <>
            {!title || id.toString() !== id ? <LoaderComponent/> : getView()}
        </>
    )
        ;
}

OfferView.propTypes = {
    userId: PropTypes.number,
    currentOffer:
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            author: PropTypes.string,
            price: PropTypes.PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            status: PropTypes.string,
            ownerId: PropTypes.number,
            attachment: PropTypes.shape({
                name: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            }),
        }),

};

export default connect(state => ({
    userId: state.user.id,
    currentOffer: state.offers.currentOffer
}))(withRouter(OfferView));
