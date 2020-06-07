import React, {useEffect} from 'react';
import Api from "./../../common/api-communication"
import {Link, useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoaderComponent from "../LoaderComponent";
import Card from "@material-ui/core/Card/Card";
import {CLEAR_CURRENT_OFFER} from "../../redux/actions";
import {MESSAGES, OFFERS, USERS} from "../../common/paths";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {OfferStatus} from "../../common/app-constants";
import OfferWarningStrip from "./OfferWarningStrip";
import PhotoPreviewComponent from "../PhotoPreviewComponent";
import UserBannerComponent from "../user/UserBannerComponent";

function OfferView(props) {

    const [loading, setLoading] = React.useState(false);
    const {t} = useTranslation();
    const {dispatch, history} = props;
    let {id} = useParams();
    id = parseInt(id);
    const invalidId = isNaN(id);
    if(invalidId) {
        history.push(OFFERS);
    }
    const propId = props.currentOffer.id;
    const {title, author, price, ownerId, status, attachment, owner} = props.currentOffer;
    const wrongOfferIsLoaded = !propId || propId !== id || invalidId;

    useEffect(() => {
        if (!loading && !invalidId && wrongOfferIsLoaded) {
            dispatch({type: CLEAR_CURRENT_OFFER});
            setLoading(true);
            dispatch(Api.getOffer(id)).then(res => {
                if(res.action.payload.status === 400) {
                    history.replace(OFFERS);
                }
            }).then(() => setLoading(false));
        }
    }, [dispatch, history, id, wrongOfferIsLoaded, loading, invalidId]);

    const handleSendMessage = () => {
        dispatch(Api.createConversation(id)).then(res => {
            history.push(MESSAGES + '/' + res.value.id);
        });
    };

    const getView = () => {
        return (
            <div className={'offer-view'}>
                {attachment ? <img src={attachment.url} alt={"Offer"}/>
                    : <PhotoPreviewComponent edit={false}/>}
                <Container maxWidth={'xs'}>
                    <Card className={'offer-card-details'}>
                        <div className={'primary-text'}>
                            <label htmlFor={'price'}>Cena</label>
                            <span id={'price'}>
                            {price + ' ' + t('currencySymbol')}
                        </span>
                        </div>
                        <div className={'secondary-text'}>
                            <label htmlFor={'title'}>Tytuł</label>
                            <span id={'title'}>
                            {title}
                        </span>
                        </div>
                        <div className={'other-text'}>
                            <label htmlFor={'author'}>Autor</label>
                            <span id={'author'}>
                            {author}
                        </span>
                        </div>
                        {OfferStatus.ACTIVE === status ?
                            <CardActions>
                                {ownerId !== props.userId ?
                                    <Button size={"small"} variant="contained" color="primary" type="submit"
                                            onClick={() => handleSendMessage()}>
                                        {t('offer.sendMessage')}
                                    </Button> : <OfferWarningStrip text={t('offer.owner.myoffer')}/>
                                }
                            </CardActions> : <OfferWarningStrip text={t('offer.status.inactiveWarn')}/>
                        }

                    </Card>
                    <Card className={'user-details'}>
                        <Link to={USERS + '/' + owner.id} className={'link-no-styles'}>
                            <UserBannerComponent username={owner.username}/>
                        </Link>
                    </Card>
                </Container>
            </div>
        );
    };

    return (
        <>
            {wrongOfferIsLoaded ? <Card><LoaderComponent/></Card> : getView()}
        </>
    );
}

OfferView.propTypes = {
    userId: PropTypes.number,
    currentOffer:
        PropTypes.shape({
            apiError: PropTypes.string,
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
            owner: PropTypes.shape({
                id: PropTypes.number.isRequired,
                username: PropTypes.string.isRequired,
            })
        }),

};

export default connect(state => ({
    userId: state.me.id,
    currentOffer: state.offers.currentOffer
}))(withRouter(OfferView));
