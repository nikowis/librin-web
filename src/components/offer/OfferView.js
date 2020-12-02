import React, {useEffect} from "react";
import Api from "./../../common/api-communication";
import {useParams, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import LoaderComponent from "../LoaderComponent";
import Card from "@material-ui/core/Card/Card";
import {CLEAR_CURRENT_OFFER} from "../../redux/actions";
import {LOGIN, CONVERSATIONS, OFFERS} from "../../common/paths";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import {convertConditionValueToInt, OfferStatus, PAPER_ELEVATION} from "../../common/app-constants";
import WarningStrip from "./../WarningStrip";
import EmptyPhotoPreviewComponent from "../EmptyPhotoPreviewComponent";
import UserBannerComponent from "../user/UserBannerComponent";
import OfferPhotosComponent from "./OfferPhotosComponent";
import {Grid} from "@material-ui/core";
import OfferStatusInfoBanner from "./OfferStatusInfoBanner";
import Rating from "@material-ui/lab/Rating/Rating";
import ReportingComponent from "./ReportingComponent";
import Helmet from "react-helmet";
import {offerPropType} from "common/prop-types";

function OfferView(props) {
  const [loading, setLoading] = React.useState(false);
  const {t} = useTranslation();
  const {dispatch, history} = props;
  let {id} = useParams();
  id = parseInt(id);
  const invalidId = isNaN(id);
  if (invalidId) {
    history.push(OFFERS);
  }
  const propId = props.currentOffer.id;
  const {
    title,
    author,
    price,
    ownerId,
    status,
    photos,
    owner,
    description,
    category,
    condition,
  } = props.currentOffer;
  const wrongOfferIsLoaded = !propId || propId !== id;
  useEffect(() => {
    if (!loading && !invalidId && wrongOfferIsLoaded) {
      dispatch({type: CLEAR_CURRENT_OFFER});
      setLoading(true);
      dispatch(Api.getOffer(id))
          .then((res) => {
            if (res.action.payload.status === 400) {
              history.replace(OFFERS);
            }
          })
          .then(() => setLoading(false));
    }
  }, [dispatch, history, id, wrongOfferIsLoaded, loading, invalidId]);

  const [sendingMessage, setSendingMessage] = React.useState(false);

  const handleSendMessage = () => {
    if (props.authenticated && !sendingMessage) {
      setSendingMessage(true);
      dispatch(Api.createConversation(id)).then((res) => {
        setSendingMessage(false);
        history.push(CONVERSATIONS + "/" + res.value.id);
      });
    } else {
      history.push(LOGIN);
    }
  };

  const imagesGridSize = photos && photos.length > 1 ? 6 : 4;

  const getView = () => {
    return (
        <>
          <Helmet>
            <title>{title + ' - ' + t('brand')}</title>
            <meta name="robots" content="index, nofollow"/>
          </Helmet>
          <Grid container className={"offer-view"} spacing={1} justify={"center"}>
            <Grid item xs={12} sm={8} md={imagesGridSize}>
              {photos && photos.length > 0 ? (
                  <OfferPhotosComponent photos={photos}/>
              ) : (
                  <EmptyPhotoPreviewComponent/>
              )}
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Card elevation={PAPER_ELEVATION} square className={"user-details"}>
                <UserBannerComponent user={owner} withLink/>
              </Card>
              <Card
                  elevation={PAPER_ELEVATION}
                  square
                  className={"offer-card-details"}
              >
                <ReportingComponent offerId={id}/>
                <div className={"primary-text"}>
                  <label htmlFor={"price"}>{t("offer.price")}</label>
                  <span id={"price"}>{price + " " + t("currencySymbol")}</span>
                </div>
                <div className={"secondary-text"}>
                  <label htmlFor={"title"}>{t("offer.title")}</label>
                  <span id={"title"}>{title}</span>
                </div>
                <div className={"secondary-text"}>
                  <label htmlFor={"author"}>{t("offer.author")}</label>
                  <span id={"author"}>{author}</span>
                </div>
                <div className={"secondary-text"}>
                  <label htmlFor={"description"}>{t("offer.description")}</label>
                  <span id={"description"}>{description}</span>
                </div>
                <div className={"secondary-text"}>
                  <label htmlFor={"category"}>{t("offer.category.label")}</label>
                  <span id={"category"}>{t("offer.category." + category)}</span>
                </div>
                <div className={"secondary-text"}>
                  <label htmlFor={"condition"}>{t("offer.condition.label")}</label>
                  <div className={"condition-box"}>
                    <Rating
                        id="condition"
                        name="condition"
                        className={"condition-stars"}
                        readOnly
                        value={convertConditionValueToInt(condition)}
                    />
                    <span
                        className={'condition-hint'}>{condition ? t('offer.condition.' + condition) : null}</span>
                  </div>
                </div>
                {OfferStatus.ACTIVE === status ? (
                    <CardActions>
                      {ownerId !== props.userId ? (
                          <div className={'offer-actions'}>
                            <Button
                                size={"small"}
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={() => handleSendMessage()}
                            >
                              {t("offer.sendMessage")}
                            </Button>
                          </div>
                      ) : (
                          <WarningStrip text={t("offer.owner.myoffer")}/>
                      )}
                    </CardActions>
                ) : (
                    <OfferStatusInfoBanner offer={props.currentOffer} userId={props.userId}/>
                )}
              </Card>

            </Grid>
          </Grid>
        </>
    );
  };

  return (
      <>
        {wrongOfferIsLoaded ? <LoaderComponent/> : (
            getView()
        )}
      </>
  );
}

OfferView.propTypes = {
  userId: PropTypes.number,
  authenticated: PropTypes.bool.isRequired,
  currentOffer: offerPropType,
};

export default connect((state) => ({
  authenticated: state.me.authenticated,
  userId: state.me.id,
  currentOffer: state.offers.currentOffer,
}))(withRouter(OfferView));
