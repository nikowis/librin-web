import React, {useEffect} from "react";
import Api from "common/api-communication";
import {useParams, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import LoaderComponent from "components/LoaderComponent";
import Card from "@material-ui/core/Card/Card";
import {CLEAR_CURRENT_OFFER} from "redux/actions";
import {OFFERS} from "common/paths";
import {PAPER_ELEVATION} from "common/app-constants";
import EmptyPhotoPreviewComponent from "components/EmptyPhotoPreviewComponent";
import UserCardComponent from "components/user/UserCardComponent";
import OfferPhotosComponent from "components/offer/OfferPhotosComponent";
import {Grid} from "@material-ui/core";
import Helmet from "react-helmet";
import {offerPropType} from "common/prop-types";
import OfferDetails from "components/offer/OfferDetails";

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
    photos,
    owner,
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
                <UserCardComponent user={owner} withLink={true}/>
              </Card>
              <Card
                  elevation={PAPER_ELEVATION}
                  square
                  className={"offer-card-details"}
              >
                <OfferDetails/>
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
  currentOffer: offerPropType,
};

export default connect((state) => ({
  currentOffer: state.offers.currentOffer,
}))(withRouter(OfferView));
