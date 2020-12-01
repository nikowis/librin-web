import {Paper} from "@material-ui/core";
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
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {useFormik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Redirect} from "react-router-dom";
import Api from "common/api-communication";
import {NOTIFICATION_DURATION, PAPER_ELEVATION} from "common/app-constants";
import {translate} from "common/i18n-helper";
import {LOGIN, OFFERS} from "common/paths";
import {registerSchema} from "common/validation-schemas";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "redux/actions";
import RegisterConsentComponent from "components/user/RegisterConsentComponent";
import TitleComponent from "components/TitleComponent";
import TextFieldInput from "components/input/TextFieldInput";

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

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    },
    onSubmit: handleSubmit,
    validationSchema: registerSchema,
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  if (props.authenticated) {
    return <Redirect to={OFFERS} push={true}/>
  }

  return (
      <>
        <TitleComponent content={t('register.page')}/>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>

          <form onSubmit={formik.handleSubmit}>

            <TextFieldInput onChange={handleChange} error={errors.email} value={values.email}
                            touched={touched.email} name={'email'} label={t('user.email.label')}/>

            <TextFieldInput onChange={handleChange} error={errors.firstName} value={values.firstName}
                            touched={touched.firstName} name={'firstName'} label={t('user.firstName')}/>

            <TextFieldInput onChange={handleChange} error={errors.lastName} value={values.lastName}
                            touched={touched.lastName} name={'lastName'} label={t('user.lastName')}/>

            <TextFieldInput onChange={handleChange} error={errors.username} value={values.username}
                            touched={touched.username} name={'username'} label={t('user.username')}/>

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
