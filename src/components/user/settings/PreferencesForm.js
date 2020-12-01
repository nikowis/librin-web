import {FormHelperText, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useFormik} from 'formik';
import PropTypes from "prop-types";
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "common/api-communication";
import {NOTIFICATION_DURATION, PAPER_ELEVATION} from "common/app-constants";
import {translate} from "common/i18n-helper";
import {preferencesSchema} from "common/validation-schemas";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION, UPDATE_USER} from "redux/actions";
import CityInput from "components/input/CityInput";
import CheckboxInput from "components/input/CheckboxInput";

function PreferencesForm(props) {

  const {t} = useTranslation();
  const {dispatch, exchange, shipment, selfPickup, selfPickupCity} = props;

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.updateUserPreferences(data).payload.then((response) => {
      if (!response.error) {
        props.dispatch({type: UPDATE_USER, payload: response});
        props.dispatch({type: SHOW_NOTIFICATION, payload: t('notification.preferencesUpdated')});
        setTimeout(() => {
          dispatch({type: HIDE_NOTIFICATION})
        }, NOTIFICATION_DURATION);
      } else if (response.status && response.status === 400) {
        response.errors.forEach(err => {
          actions.setFieldError(err.field, err.defaultMessage);
        });
      }
    }).finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      exchange: exchange ? exchange : false,
      shipment: shipment ? shipment : false,
      selfPickup: selfPickup ? selfPickup : false,
      selfPickupCity: selfPickupCity
    },
    onSubmit: handleSubmit,
    validationSchema: preferencesSchema,
    enableReinitialize: true
  });

  const {values, errors, touched, handleChange, isSubmitting, setFieldValue} = formik;

  return (
      <>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
          <h3>{t('settings.preferencesForm')}</h3>

          <form onSubmit={formik.handleSubmit}>

            <CheckboxInput onChange={handleChange} error={errors.exchange} checked={values.exchange}
                           touched={touched.exchange} name={'exchange'} label={t('user.exchange')}/>

            <CheckboxInput onChange={handleChange} error={errors.shipment} checked={values.shipment}
                           touched={touched.shipment} name={'shipment'} label={t('user.shipment')} hideErrorText/>

            <CheckboxInput onChange={handleChange} error={errors.selfPickup} checked={values.selfPickup}
                           touched={touched.selfPickup} name={'selfPickup'} label={t('user.selfPickup')} hideErrorText/>

            {values.selfPickup ?
                <CityInput value={values.selfPickupCity} error={errors.selfPickupCity}
                           touched={touched.selfPickupCity}
                           onChange={(v) => {
                             setFieldValue('selfPickupCity', v);
                           }}
                />
                : null
            }

            {errors.shipment && touched.shipment ? (
                <FormHelperText error>{translate(errors.shipment)}</FormHelperText>
            ) : null}
            <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              {t('submit')}
            </Button>
          </form>

        </Paper>
      </>
  );

}

PreferencesForm.propTypes = {
  exchange: PropTypes.bool,
  shipment: PropTypes.bool,
  selfPickup: PropTypes.bool,
  selfPickupCity: PropTypes.object,
};

export default connect(state => ({
  exchange: state.me.exchange,
  shipment: state.me.shipment,
  selfPickup: state.me.selfPickup,
  selfPickupCity: state.me.selfPickupCity,
}))(withRouter(PreferencesForm));
