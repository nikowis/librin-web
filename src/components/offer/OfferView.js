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
import CardActions from "@material-ui/core/CardActions/CardActions";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {OfferStatus} from "../../common/app-constants";
import Avatar from "@material-ui/core/Avatar";
import OfferWarningStrip from "./OfferWarningStrip";

function OfferView(props) {

    const [loading, setLoading] = React.useState(false);
    const {t} = useTranslation();
    const {dispatch} = props;
    let {id} = useParams();
    id = parseInt(id);
    const propId = props.currentOffer.id;
    const apiError = props.currentOffer.apiError;

    const {history} = props;
    const {title, author, price, ownerId, status, attachment, owner} = props.currentOffer;
    const wrongOfferIsLoaded = !propId || propId !== id;
    const validUrlIdParam = !isNaN(id);

    useEffect(() => {
        if (!loading && validUrlIdParam && !apiError && wrongOfferIsLoaded) {
            dispatch({type: CLEAR_CURRENT_OFFER});
            setLoading(true);
            dispatch(Api.getOffer(id)).then(() => setLoading(false));
        }
    }, [dispatch, id, wrongOfferIsLoaded, loading, apiError, validUrlIdParam]);

    const handleSendMessage = () => {
        dispatch(Api.createConversation(id)).then(res => {
            history.push(MESSAGES + '/' + res.value.id);
        });
    };

    const getView = () => {
        return (
            <div className={'offer-view'}>
                <img src={attachment ? attachment.url : process.env.PUBLIC_URL + '/Placeholder.png'}
                     alt={"Offer"}/>
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
                        <Avatar>
                            {owner.username.substring(0, 1).toUpperCase()}
                        </Avatar>
                        {owner.username}
                    </Card>
                </Container>
            </div>
        );
    };

    return (
        <>
            {validUrlIdParam && !apiError && wrongOfferIsLoaded ? <Card><LoaderComponent/></Card> : (
                !validUrlIdParam || apiError ? <Card> {t('offerNotFound')}</Card> : getView()
            )}
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
