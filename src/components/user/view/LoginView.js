import {Button, Paper} from '@material-ui/core';
import {useFormik} from 'formik';
import PropTypes from "prop-types";
import React from 'react';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Api from "common/api-communication";
import {PAPER_ELEVATION} from 'common/app-constants';
import {GENERATE_CONFIRM_EMAIL, GENERATE_PASSWORD_RESET, OFFERS, REGISTER} from "common/paths";
import {loginSchema} from "common/validation-schemas";
import TitleComponent from "components/TitleComponent";
import TextFieldInput from "components/input/TextFieldInput";

function LoginView(props) {

  const {t} = useTranslation();

  const handleSubmit = (data, actions) => {
    const {dispatch} = props;
    actions.setSubmitting(true);
    dispatch(Api.postGetToken(data.email, data.password))
        .finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  if (props.authenticated) {
    return <Redirect to={OFFERS} push={true}/>
  }

  return (
      <>
        <TitleComponent content={t('login.page')}/>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>

          <form onSubmit={formik.handleSubmit}>
            <TextFieldInput onChange={handleChange} error={errors.email} value={values.email}
                            touched={touched.email} name={'email'} label={t('user.email.label')}/>

            <TextFieldInput onChange={handleChange} error={errors.password} value={values.password}
                            touched={touched.password} name={'password'} type={'password'}
                            label={t('user.password.label')}/>
            <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              {t('login.submit')}
            </Button>
          </form>
        </Paper>
        <Paper elevation={PAPER_ELEVATION} square className={'action-buttons-bar form-container'}>
          <Link to={REGISTER}>
            {t('user.registerLink')}
          </Link>
          <Link to={GENERATE_PASSWORD_RESET}>
            {t('user.password.generatePasswordTokenLink')}
          </Link>
          <Link to={GENERATE_CONFIRM_EMAIL}>
            {t('user.activationEmailMissing')}
          </Link>
        </Paper>
      </>
  );

}

LoginView.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
  authenticated: state.me.authenticated,
}))(LoginView);
