import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import {HOME} from "../common/paths";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import {loginSchema} from "../common/validation-schemas";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function LoginView(props) {

    const {t} = useTranslation();

    const handleSubmit = (data) => {
        const {dispatch} = props;
        dispatch(Api.postLogin(data.login, data.password));
    };

    if (props.authenticated) {
        return <Redirect to={HOME} push={true}/>
    }

    return (
        <Formik validationSchema={loginSchema} onSubmit={handleSubmit}
                initialValues={{
                    login: '',
                    password: ''
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
                    <Button variant="primary" type="submit">
                        {t('login.submit')}
                    </Button>
                </Form>
            )}
        </Formik>
    );

}

LoginView.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(LoginView);
