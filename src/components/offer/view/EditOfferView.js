import React, {useEffect} from 'react';
import Api from "common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {CLEAR_CURRENT_MYOFFER, HIDE_NOTIFICATION, OFFER_UPDATED, SHOW_NOTIFICATION} from "redux/actions";
import {NOTIFICATION_DURATION, OfferStatus, PAPER_ELEVATION} from "common/app-constants";
import LoaderComponent from "components/LoaderComponent";
import {MY_OFFERS} from "common/paths";
import OfferForm from "components/offer/OfferForm";
import Paper from "@material-ui/core/Paper/Paper";
import TitleComponent from "components/TitleComponent";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import {offerPropType} from "common/prop-types";

function EditOfferView(props) {

  const {t} = useTranslation();
  const {dispatch, history, offer} = props;
  let {id} = useParams();
  const propId = offer.id;

  useEffect(() => {
    if (propId === undefined || propId.toString() !== id) {
      dispatch({type: CLEAR_CURRENT_MYOFFER});
      dispatch(Api.getMyOffer(id)).then((res) => {
        if (res.action.payload.status === 400) {
          history.replace(MY_OFFERS);
        }
      });
    }
  }, [dispatch, history, id, propId]);

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.updateOffer(data).payload.then((response) => {
      if (!response.error) {
        dispatch({type: OFFER_UPDATED, payload: response});
        dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerUpdated')});
        setTimeout(() => {
          dispatch({type: HIDE_NOTIFICATION})
        }, NOTIFICATION_DURATION);
        history.push(MY_OFFERS);
      } else if (response.status && response.status === 400) {
        response.errors.forEach(err => {
          actions.setFieldError(err.field, err.defaultMessage);
        });
      }
    }).finally(() => actions.setSubmitting(false));
  };

  const handleRemoveOffer = () => {
    dispatch(Api.removeOffer(offer.id));
    history.replace(MY_OFFERS);
  };

  const handleActivateOffer = () => {
    dispatch(Api.activateOffer(offer.id));
  };

  const handleDeactivateOffer = () => {
    dispatch(Api.deactivateOffer(offer.id));
  };

  const status = !!(offer && offer.status) ? offer.status.toLowerCase() : '';

  const actionButtons =
      <Paper elevation={PAPER_ELEVATION} square className={'action-buttons-bar form-container'}>
        <div>
          <Chip label={t('offer.status.' + status)} className={'status-info-' + status}/>
        </div>
        {offer.status === OfferStatus.ACTIVE ?
            <Button size={"small"} variant="outlined" color="primary"
                    onClick={() => handleDeactivateOffer()}>
              {t('offer.status.deactivateOffer')}
            </Button> : null}
        {offer.status === OfferStatus.INACTIVE ?
            <Button size={"small"} variant="outlined" color="primary"
                    onClick={() => handleActivateOffer()}>
              {t('offer.status.activateOffer')}
            </Button> : null}
        {offer.status === OfferStatus.ACTIVE || offer.status === OfferStatus.INACTIVE ?
            <Button size={"small"} variant="outlined" color="secondary"
                    onClick={() => handleRemoveOffer()}>
              {t('offer.status.deleteOffer')}
            </Button> : null}
      </Paper>;

  const getView = () => {
    return (
        <>
          <TitleComponent content={t('offer.editPageTitle')}/>
          <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
            <OfferForm offer={offer} handleSubmit={handleSubmit}/>
          </Paper>
          {actionButtons}
        </>
    );
  };

  return (
      <>
        {offer.title === null || !offer.id || offer.id.toString() !== id ? <LoaderComponent/> : getView()}
      </>
  );
}

EditOfferView.propTypes = {
  offer: offerPropType,
};

export default connect(state => ({
  offer: state.myoffers.currentOffer
}))(withRouter(EditOfferView));
