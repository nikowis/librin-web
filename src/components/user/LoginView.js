import {Button, Paper, TextField} from '@material-ui/core';
import {Formik} from 'formik';
import PropTypes from "prop-types";
import React from 'react';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Api from "../../common/api-communication";
import {PAPER_ELEVATION} from '../../common/app-constants';
import {translate} from "../../common/i18n-helper";
import {GENERATE_PASSWORD_RESET, OFFERS, REGISTER} from "../../common/paths";
import {loginSchema} from "../../common/validation-schemas";
import TitleComponent from "../TitleComponent";

function LoginView(props) {

  const {t} = useTranslation();

  const handleSubmit = (data, actions) => {
    const {dispatch} = props;
    actions.setSubmitting(true);
    dispatch(Api.postGetToken(data.email, data.password))
        .finally(() => actions.setSubmitting(false));
  };

  if (props.authenticated) {
    return <Redirect to={OFFERS} push={true}/>
  }

  return (
      <>
        <TitleComponent content={t('login.page')}/>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
          <Formik validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                  initialValues={{
                    email: '',
                    password: ''
                  }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                        size="small"
                        error={errors.email && touched.email}
                        label={t('user.email.label')}
                        name="email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        helperText={(errors.email && touched.email) && translate(errors.email)}
                        margin="dense"
                    />
                  </div>
                  <div>
                    <TextField
                        size="small"
                        error={errors.password && touched.password}
                        label={t('user.password.label')}
                        name="password"
                        type="password"
                        variant="outlined"
                        value={values.password}
                        onChange={handleChange}
                        helperText={(errors.password && touched.password) && translate(errors.password)}
                        margin="dense"
                    />
                  </div>
                  <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                    {t('login.submit')}
                  </Button>
                </form>
            )}
          </Formik>
        </Paper>
        <Paper elevation={PAPER_ELEVATION} square className={'action-buttons-bar form-container'}>
          <Link to={REGISTER}>
            {t('user.registerLink')}
          </Link>
          <Link to={GENERATE_PASSWORD_RESET}>
            {t('user.password.generatePasswordTokenLink')}
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
