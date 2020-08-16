import {Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {makeStyles} from "@material-ui/core/styles";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from "clsx";
import {Formik} from 'formik';
import PropTypes from "prop-types";
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import Api from "../../common/api-communication";
import {NOTIFICATION_DURATION, PAPER_ELEVATION} from "../../common/app-constants";
import {translate} from "../../common/i18n-helper";
import {LOGIN, OFFERS} from "../../common/paths";
import {registerSchema} from "../../common/validation-schemas";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import RegisterConsentComponent from "./RegisterConsentComponent";
import TitleComponent from "../TitleComponent";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
}));

function RegisterView(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const {dispatch, history} = props;
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.postRegister(data).payload.then((response) => {
      if (!response.error) {
        dispatch({type: SHOW_NOTIFICATION, payload: t('notification.registered')});
        setTimeout(() => {
          dispatch({type: HIDE_NOTIFICATION})
        }, NOTIFICATION_DURATION);
        history.push(LOGIN);
      } else if (response.status && response.status === 400) {
        response.errors.forEach(err => {
          actions.setFieldError(err.field, err.defaultMessage);
        });
      }
    }).finally(() => actions.setSubmitting(false));
  };

  if (props.authenticated) {
    return <Redirect to={OFFERS} push={true}/>
  }

  return (
      <>
        <TitleComponent content={t('register.page')}/>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
          <Formik validationSchema={registerSchema} onSubmit={handleSubmit}
                  initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    username: '',
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
                        fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                        size="small"
                        error={errors.firstName && touched.firstName}
                        label={t('user.firstName')}
                        name="firstName"
                        variant="outlined"
                        value={values.firstName}
                        onChange={handleChange}
                        helperText={(errors.firstName && touched.firstName) && translate(errors.firstName)}
                        margin="dense"
                        fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                        size="small"
                        error={errors.lastName && touched.lastName}
                        label={t('user.lastName')}
                        name="lastName"
                        variant="outlined"
                        value={values.lastName}
                        onChange={handleChange}
                        helperText={(errors.lastName && touched.lastName) && translate(errors.lastName)}
                        margin="dense"
                        fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                        size="small"
                        error={errors.username && touched.username}
                        label={t('user.username')}
                        name="username"
                        variant="outlined"
                        value={values.username}
                        onChange={handleChange}
                        helperText={(errors.username && touched.username) && translate(errors.username)}
                        margin="dense"
                        fullWidth
                    />
                  </div>
                  <div>
                    <FormControl margin="dense" size="small" className={clsx(classes.margin, classes.textField)}
                                 variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-password">{t('user.password.label')}</InputLabel>
                      <OutlinedInput
                          size="small"
                          id="outlined-adornment-password"
                          error={errors.password && touched.password}
                          name="password"
                          type={passwordVisible ? 'text' : 'password'}
                          value={values.password}
                          onChange={handleChange}
                          labelWidth={70}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setPasswordVisible(!passwordVisible)}
                              >
                                {passwordVisible ? <Visibility/> : <VisibilityOff/>}
                              </IconButton>
                            </InputAdornment>
                          }
                      />
                      <FormHelperText id="outlined-weight-helper-text" error={errors.password && touched.password}>
                        {(errors.password && touched.password) && translate(errors.password)}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <RegisterConsentComponent/>
                  <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                    {t('register.submit')}
                  </Button>
                </form>
            )}
          </Formik>
        </Paper>
      </>
  );
}

RegisterView.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
  authenticated: state.me.authenticated,
}))(withRouter(RegisterView));
