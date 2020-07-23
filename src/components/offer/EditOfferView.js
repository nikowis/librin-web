import React, {useEffect} from 'react';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {CLEAR_CURRENT_MYOFFER, HIDE_NOTIFICATION, OFFER_UPDATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import PropTypes from "prop-types";
import LoaderComponent from "../LoaderComponent";
import {MY_OFFERS} from "../../common/paths";
import EditOfferComponent from "./EditOfferComponent";
import Paper from "@material-ui/core/Paper/Paper";
import TitleComponent from "../TitleComponent";

function EditOfferView(props) {

  const {t} = useTranslation();
  const {dispatch, history, offer} = props;
  let {id} = useParams();
  const propId = offer.id;

  useEffect(() => {
    if (propId === null || propId.toString() !== id) {
      dispatch({type: CLEAR_CURRENT_MYOFFER});
      dispatch(Api.getMyOffer(id));
    }
  }, [dispatch, id, propId]);

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

  const getView = () => {
    return (
        <>
          <TitleComponent content={t('offer.editPageTitle')}/>
          <Paper className={'form-container'}>
            <EditOfferComponent offer={offer} handleSubmit={handleSubmit}/>
          </Paper>
        </>
    );
  };

  return (
      <>
        {offer.title === null || offer.id.toString() !== id ? <LoaderComponent/> : getView()}
      </>
  );
}

EditOfferView.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    attachment: PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }),
  }),
};

export default connect(state => ({
  offer: state.myoffers.currentOffer
}))(withRouter(EditOfferView));
