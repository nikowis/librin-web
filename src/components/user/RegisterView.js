import React from 'react';
import '../../App.scss';
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Api from "../../common/api-communication";
import {registerSchema} from "../../common/validation-schemas";
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {HOME, LOGIN} from "../../common/paths";
import PropTypes from "prop-types";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";


function RegisterView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = (data, actions) => {
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
        });
    };
    if (props.authenticated) {
        return <Redirect to={HOME} push={true}/>
    }

    return (
        <Formik validationSchema={registerSchema} onSubmit={handleSubmit}
                initialValues={{
                    login: '',
                    password: '',
                    repeatPassword: ''
                }}
        >
            {({touched, errors, handleSubmit, handleChange, values}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="login">
                        <Form.Label>
                            {t('email')}
                        </Form.Label>
                        <Form.Control name="login" value={values.login} onChange={handleChange} type="email"
                                      isInvalid={touched.login && !!errors.login}
                                      placeholder={t('email')}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.login)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            {t('password')}
                        </Form.Label>
                        <Form.Control name="password" value={values.password} onChange={handleChange}
                                      type="password"
                                      isInvalid={touched.password && !!errors.password}
                                      placeholder={t('password')}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.password)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="repeatPassword">
                        <Form.Label>
                            {t('repeatPassword')}
                        </Form.Label>
                        <Form.Control name="repeatPassword" value={values.repeatPassword} onChange={handleChange}
                                      type="password"
                                      isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                      placeholder={t('repeatPassword')}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.repeatPassword)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('register.submit')}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

RegisterView.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(withRouter(RegisterView));
