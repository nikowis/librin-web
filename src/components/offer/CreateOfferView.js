import React from 'react';
import Api from "./../../common/api-communication"
import {withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {HIDE_NOTIFICATION, OFFER_CREATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {MY_OFFERS} from "../../common/paths";
import {NOTIFICATION_DURATION, PAPER_ELEVATION} from "../../common/app-constants";
import OfferForm from "components/offer/OfferForm";
import Paper from "@material-ui/core/Paper/Paper";
import TitleComponent from "../TitleComponent";

function CreateOfferView(props) {

  const {t} = useTranslation();
  const {dispatch, history} = props;

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.createOffer(data).payload.then((response) => {
      if (!response.error) {
        dispatch({type: OFFER_CREATED});
        dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerCreated')});
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

  return (
      <>
        <TitleComponent content={t('offer.createPageTitle')}/>
        <Paper square elevation={PAPER_ELEVATION} className={'form-container'}>
          <OfferForm offer={null} handleSubmit={handleSubmit}/>
        </Paper>
      </>
  );
}

CreateOfferView.propTypes = {};

export default connect()(withRouter(CreateOfferView));
