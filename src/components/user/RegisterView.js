import React from 'react';
import '../../App.scss';
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Api from "../../common/api-communication";
import {registerSchema} from "../../common/validation-schemas";
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {LOGIN, OFFERS} from "../../common/paths";
import PropTypes from "prop-types";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";


function RegisterView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.postRegister(data.login, data.password).payload.then((response) => {
            if (!response.status) {
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
        <Card>
            <Formik validationSchema={registerSchema} onSubmit={handleSubmit}
                    initialValues={{
                        login: '',
                        password: '',
                        repeatPassword: ''
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
                                error={errors.login && touched.login}
                                label={t('email')}
                                name="login"
                                variant="outlined"
                                value={values.login}
                                onChange={handleChange}
                                helperText={(errors.login && touched.login) && t(errors.login)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.password && touched.password}
                                label={t('password')}
                                name="password"
                                type="password"
                                variant="outlined"
                                value={values.password}
                                onChange={handleChange}
                                helperText={(errors.password && touched.password) && t(errors.password)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.repeatPassword && touched.repeatPassword}
                                label={t('repeatPassword')}
                                name="repeatPassword"
                                type="password"
                                variant="outlined"
                                value={values.repeatPassword}
                                onChange={handleChange}
                                helperText={(errors.repeatPassword && touched.repeatPassword) && t(errors.repeatPassword)}
                                margin="normal"
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {t('register.submit')}
                        </Button>
                    </form>
                )}
            </Formik>
        </Card>
    );
}

RegisterView.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(withRouter(RegisterView));
