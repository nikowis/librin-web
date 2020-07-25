import React, { useEffect } from "react";
import Api from "./../../common/api-communication";
import { Link, useParams, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoaderComponent from "../LoaderComponent";
import Card from "@material-ui/core/Card/Card";
import { CLEAR_CURRENT_OFFER } from "../../redux/actions";
import { LOGIN, MESSAGES, OFFERS, USERS } from "../../common/paths";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import { OfferStatus, PAPER_ELEVATION } from "../../common/app-constants";
import WarningStrip from "./../WarningStrip";
import EmptyPhotoPreviewComponent from "../EmptyPhotoPreviewComponent";
import UserBannerComponent from "../user/UserBannerComponent";
import OfferPhotosComponent from "./OfferPhotosComponent";
import { Grid } from "@material-ui/core";

function OfferView(props) {
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const { dispatch, history } = props;
  let { id } = useParams();
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
    attachments,
    owner,
    description,
    category,
    condition,
  } = props.currentOffer;
  const wrongOfferIsLoaded = !propId || propId !== id;
  useEffect(() => {
    if (!loading && !invalidId && wrongOfferIsLoaded) {
      dispatch({ type: CLEAR_CURRENT_OFFER });
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

  const handleSendMessage = () => {
    if (props.authenticated) {
      dispatch(Api.createConversation(id)).then((res) => {
        history.push(MESSAGES + "/" + res.value.id);
      });
    } else {
      history.push(LOGIN);
    }
  };

  const imagesGridSize = attachments && attachments.length > 1 ? 6 : 4;

  const getView = () => {
    return (
      <Grid container className={"offer-view"} spacing={1} justify={"center"}>
        <Grid item xs={12} sm={8} md={imagesGridSize}>
          {attachments && attachments.length > 0 ? (
            <OfferPhotosComponent photos={attachments} />
          ) : (
            <EmptyPhotoPreviewComponent />
          )}
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Card elevation={PAPER_ELEVATION} square className={"user-details"}>
            <UserBannerComponent username={owner.username} id={owner.id} status={owner.status} withLink/>
          </Card>
          <Card
            elevation={PAPER_ELEVATION}
            square
            className={"offer-card-details"}
          >
            <div className={"primary-text"}>
              <label htmlFor={"price"}>{t("offer.price")}</label>
              <span id={"price"}>{price + " " + t("currencySymbol")}</span>
            </div>
            <div className={"secondary-text"}>
              <label htmlFor={"title"}>{t("offer.title")}</label>
              <span id={"title"}>{title}</span>
            </div>
            <div className={"other-text"}>
              <label htmlFor={"author"}>{t("offer.author")}</label>
              <span id={"author"}>{author}</span>
            </div>
            <div className={"other-text"}>
              <label htmlFor={"description"}>{t("offer.description")}</label>
              <span id={"description"}>{description}</span>
            </div>
            <div className={"other-text"}>
              <label htmlFor={"category"}>{t("offer.category.label")}</label>
              <span id={"category"}>{t("offer.category." + category)}</span>
            </div>
            <div className={"other-text"}>
              <label htmlFor={"condition"}>{t("offer.condition.label")}</label>
              <span id={"condition"}>{t("offer.condition." + condition)}</span>
            </div>
            {OfferStatus.ACTIVE === status ? (
              <CardActions>
                {ownerId !== props.userId ? (
                  <Button
                    size={"small"}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => handleSendMessage()}
                  >
                    {t("offer.sendMessage")}
                  </Button>
                ) : (
                  <WarningStrip text={t("offer.owner.myoffer")} />
                )}
              </CardActions>
            ) : (
              <WarningStrip text={t("offer.status.inactiveWarn")} />
            )}
          </Card>

        </Grid>
      </Grid>
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
  currentOffer: PropTypes.shape({
    apiError: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    condition: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    ownerId: PropTypes.number,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
    owner: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default connect((state) => ({
  authenticated: state.me.authenticated,
  userId: state.me.id,
  currentOffer: state.offers.currentOffer,
}))(withRouter(OfferView));
