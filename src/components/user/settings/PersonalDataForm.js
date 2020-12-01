import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useFormik} from 'formik';
import PropTypes from "prop-types";
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "common/api-communication";
import {NOTIFICATION_DURATION, PAPER_ELEVATION} from "common/app-constants";
import {personalDataSchema} from "common/validation-schemas";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION, UPDATE_USER} from "redux/actions";
import TextFieldInput from "components/input/TextFieldInput";

function PersonalDataForm(props) {

  const {t} = useTranslation();
  const {dispatch} = props;

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.updateUser(data).payload.then((response) => {
      if (!response.error) {
        props.dispatch({type: UPDATE_USER, payload: response});
        props.dispatch({type: SHOW_NOTIFICATION, payload: t('notification.personalDataUpdated')});
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
      id: props.id,
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      username: props.username,
    },
    onSubmit: handleSubmit,
    validationSchema: personalDataSchema,
    enableReinitialize: true
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  return (
      <>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
          <h3>{t('settings.personalDataForm')}</h3>

          <form onSubmit={formik.handleSubmit}>
            <TextFieldInput onChange={handleChange} error={errors.email} value={values.email} disabled
                            touched={touched.email} name={'email'} label={t('email')}/>

            <TextFieldInput onChange={handleChange} error={errors.username} value={values.username} disabled
                            touched={touched.username} name={'username'} label={t('user.username')}/>

            <TextFieldInput onChange={handleChange} error={errors.firstName} value={values.firstName}
                            touched={touched.firstName} name={'firstName'} label={t('user.firstName')}/>

            <TextFieldInput onChange={handleChange} error={errors.lastName} value={values.lastName}
                            touched={touched.lastName} name={'lastName'} label={t('user.lastName')}/>

            <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              {t('submit')}
            </Button>
          </form>

        </Paper>
      </>
  );

}

PersonalDataForm.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
};

export default connect(state => ({
  id: state.me.id,
  email: state.me.email,
  firstName: state.me.firstName,
  lastName: state.me.lastName,
  username: state.me.username,
}))(withRouter(PersonalDataForm));
